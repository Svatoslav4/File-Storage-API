import request from 'supertest';
import app from '@/app';
import { prisma } from '@/config/prisma';
import cloudinaryService from '@/services/cloudinary.service';

jest.mock('@/config/prisma', () => ({
  prisma: {
    file: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  },
}));

jest.mock('@/services/cloudinary.service', () => ({
  __esModule: true,
  default: {
    uploadFile: jest.fn(),
    deleteFile: jest.fn(),
  },
}));

const prismaFile = prisma.file as unknown as {
  create: jest.Mock;
  findMany: jest.Mock;
  findUnique: jest.Mock;
  delete: jest.Mock;
};

const mockedCloudinaryService = cloudinaryService as jest.Mocked<typeof cloudinaryService>;

describe('files API integration', () => {
  const storedFile = {
    id: 'file-1',
    filename: 'photo.png',
    originalName: 'photo.png',
    mimeType: 'image/png',
    size: 4,
    url: 'https://res.cloudinary.com/example/photo.png',
    publicId: 'files/photo',
    createdAt: new Date('2026-08-28T10:00:00.000Z'),
    updatedAt: new Date('2026-08-28T10:00:00.000Z'),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uploads an image through the complete HTTP pipeline', async () => {
    mockedCloudinaryService.uploadFile.mockResolvedValue({
      url: storedFile.url,
      publicId: storedFile.publicId,
    });
    prismaFile.create.mockResolvedValue(storedFile);

    const response = await request(app)
      .post('/api/files/upload')
      .attach('image', Buffer.from('test'), 'photo.png');

    expect(response.status).toBe(201);
    expect(response.body).toEqual({
      success: true,
      data: expect.objectContaining({
        id: storedFile.id,
        originalName: 'photo.png',
        mimeType: 'image/png',
      }),
    });
    expect(mockedCloudinaryService.uploadFile).toHaveBeenCalledTimes(1);
    expect(prismaFile.create).toHaveBeenCalledWith({
      data: expect.objectContaining({
        filename: 'photo.png',
        originalName: 'photo.png',
        mimeType: 'image/png',
        size: 4,
        url: storedFile.url,
        publicId: storedFile.publicId,
      }),
    });
  });

  it('rejects an upload without a file', async () => {
    const response = await request(app).post('/api/files/upload');

    expect(response.status).toBe(400);
    expect(response.body).toEqual({
      success: false,
      message: 'File is required',
    });
  });

  it('lists files returned by the repository', async () => {
    prismaFile.findMany.mockResolvedValue([storedFile]);

    const response = await request(app).get('/api/files');

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      data: [expect.objectContaining({ id: storedFile.id })],
    });
    expect(prismaFile.findMany).toHaveBeenCalledWith({
      orderBy: { createdAt: 'desc' },
    });
  });

  it('returns 404 when the requested file does not exist', async () => {
    prismaFile.findUnique.mockResolvedValue(null);

    const response = await request(app).get('/api/files/missing-file');

    expect(response.status).toBe(404);
    expect(response.body).toEqual({
      success: false,
      message: 'File not found',
    });
  });

  it('deletes a file from storage and the repository', async () => {
    prismaFile.findUnique.mockResolvedValue(storedFile);
    mockedCloudinaryService.deleteFile.mockResolvedValue({ result: 'ok' });
    prismaFile.delete.mockResolvedValue(storedFile);

    const response = await request(app).delete(`/api/files/${storedFile.id}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      success: true,
      message: 'File deleted successfully',
    });
    expect(mockedCloudinaryService.deleteFile).toHaveBeenCalledWith(storedFile.publicId);
    expect(prismaFile.delete).toHaveBeenCalledWith({
      where: { id: storedFile.id },
    });
  });
});