const prismaMock = {
  file: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

jest.mock('@/config/prisma', () => ({
  prisma: prismaMock,
}));

import fileRepository from '@/models/file/file.repository';

describe('file.repository', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('creates a file record', async () => {
    const data = {
      filename: 'a.png',
      originalName: 'a.png',
      mimeType: 'image/png',
      size: 100,
      url: 'https://x',
      publicId: 'pid',
      userId: 'user-1',
    };

    await fileRepository.create(data);

    expect(prismaMock.file.create).toHaveBeenCalledWith({
      data,
    });
  });

  it('finds all files', async () => {
    await fileRepository.findAll();

    expect(prismaMock.file.findMany).toHaveBeenCalledWith({
      orderBy: {
        createdAt: 'desc',
      },
    });
  });

  it('finds a file by id', async () => {
    await fileRepository.findById('1');

    expect(prismaMock.file.findUnique).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });

  it('deletes a file by id', async () => {
    await fileRepository.delete('1');

    expect(prismaMock.file.delete).toHaveBeenCalledWith({
      where: {
        id: '1',
      },
    });
  });
});