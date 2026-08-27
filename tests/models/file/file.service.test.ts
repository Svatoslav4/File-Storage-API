import fileService from '@/models/file/file.service';
import fileRepository from '@/models/file/file.repository';
import storageService from '@/services/storage.service';

jest.mock('@/models/file/file.repository');
jest.mock('@/services/storage.service');

describe('file.service', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('uploads a file and saves it to repository', async () => {
    const file = {
      originalname: 'photo.png',
      mimetype: 'image/png',
      size: 123,
      buffer: Buffer.from('abc'),
      filename: 'photo.png',
    } as Express.Multer.File;

    (storageService.upload as jest.Mock).mockResolvedValue({
      url: 'https://x',
      publicId: 'pid',
    });

    (fileRepository.create as jest.Mock).mockResolvedValue({
      id: '1',
    });

    const result = await fileService.uploadFile(file);

    expect(storageService.upload).toHaveBeenCalledWith(file);

    expect(fileRepository.create).toHaveBeenCalledWith({
      filename: 'photo.png',
      originalName: 'photo.png',
      mimeType: 'image/png',
      size: 123,
      url: 'https://x',
      publicId: 'pid',
    });

    expect(result).toEqual({ id: '1' });
  });

  it('returns all files', async () => {
    (fileRepository.findAll as jest.Mock).mockResolvedValue([{ id: '1' }]);

    const result = await fileService.getAllFiles();

    expect(result).toEqual([{ id: '1' }]);
  });

  it('returns a file by id', async () => {
    (fileRepository.findById as jest.Mock).mockResolvedValue({
      id: '1',
    });

    const result = await fileService.getFileById('1');

    expect(result).toEqual({ id: '1' });
  });

  it('deletes a file when it exists', async () => {
    (fileRepository.findById as jest.Mock).mockResolvedValue({
      publicId: 'pid',
    });

    (storageService.delete as jest.Mock).mockResolvedValue({
      result: 'ok',
    });

    (fileRepository.delete as jest.Mock).mockResolvedValue({
      id: '1',
    });

    const result = await fileService.deleteFile('1');

    expect(storageService.delete).toHaveBeenCalledWith('pid');

    expect(result).toEqual({
      message: 'File deleted successfully',
    });
  });

  it('throws when trying to delete a missing file', async () => {
    (fileRepository.findById as jest.Mock).mockResolvedValue(null);

    await expect(fileService.deleteFile('1')).rejects.toThrow('File not found');
  });
});