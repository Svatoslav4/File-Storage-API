import storageService from '@/services/storage.service';
import cloudinaryService from '@/services/cloudinary.service';

jest.mock('@/services/cloudinary.service');

describe('StorageService', () => {
  beforeEach(() => jest.clearAllMocks());

  it('delegates upload to cloudinaryService.uploadFile and returns result', async () => {
    const file = { originalname: 'a.png', buffer: Buffer.from('x') } as Express.Multer.File;
    (cloudinaryService.uploadFile as jest.Mock).mockResolvedValue({ url: 'https://x', publicId: 'pid' });

    const result = await storageService.upload(file);

    expect(cloudinaryService.uploadFile).toHaveBeenCalledWith(file);
    expect(result).toEqual({ url: 'https://x', publicId: 'pid' });
  });

  it('delegates delete to cloudinaryService.deleteFile and returns result', async () => {
    (cloudinaryService.deleteFile as jest.Mock).mockResolvedValue({ result: 'ok' });

    const result = await storageService.delete('pid');

    expect(cloudinaryService.deleteFile).toHaveBeenCalledWith('pid');
    expect(result).toEqual({ result: 'ok' });
  });
});
