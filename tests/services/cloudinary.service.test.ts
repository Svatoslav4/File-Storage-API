import cloudinaryService from '@/services/cloudinary.service';

jest.mock('@/config/cloudinary', () => ({
  __esModule: true,
  default: {
    uploader: {
      upload_stream: jest.fn(),
      destroy: jest.fn().mockResolvedValue({ result: 'ok' }),
    },
  },
}));

const cloudinary = require('@/config/cloudinary').default;

describe('cloudinary.service', () => {
  beforeEach(() => jest.clearAllMocks());

  it('deletes a file', async () => {
    const result = await cloudinaryService.deleteFile('pid');

    expect(cloudinary.uploader.destroy).toHaveBeenCalledWith('pid');
    expect(result).toEqual({ result: 'ok' });
  });

  it('uploads a file', async () => {
    cloudinary.uploader.upload_stream.mockImplementation((_options: any, callback: any) => {
      callback(null, { secure_url: 'https://x', public_id: 'pid' });
      return {};
    });

    const file = { buffer: Buffer.from('a'), originalname: 'a.png' } as Express.Multer.File;
    const result = await cloudinaryService.uploadFile(file);

    expect(result).toEqual({ url: 'https://x', publicId: 'pid' });
  });
});
