import fileController from '@/models/file/file.controller';
import fileService from '@/models/file/file.service';

jest.mock('@/modules/file/file.service');

describe('file.controller', () => {
  const createRes = () => {
    const json = jest.fn();
    const status = jest.fn().mockImplementation(() => ({ json }));

    return {
      res: { status, json },
      json,
      status,
    } as any;
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('returns 400 if upload file is missing', async () => {
    const { res, json, status } = createRes();

    const req = {
      file: undefined,
      user: {
        id: 'user-1',
      },
    } as any;

    await fileController.upload(req, res, jest.fn());

    expect(status).toHaveBeenCalledWith(400);

    expect(json).toHaveBeenCalledWith({
      success: false,
      message: 'File is required',
    });
  });

  it('uploads and returns 201', async () => {
    const { res, json, status } = createRes();

    const req = {
      file: {
        originalname: 'x.png',
        mimetype: 'image/png',
        size: 123,
        buffer: Buffer.from('abc'),
      },
      user: {
        id: 'user-1',
      },
    } as any;

    (fileService.uploadFile as jest.Mock).mockResolvedValue({
      id: '1',
    });

    await fileController.upload(req, res, jest.fn());

    expect(fileService.uploadFile).toHaveBeenCalledWith(
      req.file,
      'user-1',
    );

    expect(status).toHaveBeenCalledWith(201);

    expect(json).toHaveBeenCalledWith({
      success: true,
      data: {
        id: '1',
      },
    });
  });

  it('returns all files', async () => {
    const { res, json, status } = createRes();

    (fileService.getAllFiles as jest.Mock).mockResolvedValue([
      { id: '1' },
    ]);

    await fileController.getAll({} as any, res, jest.fn());

    expect(status).toHaveBeenCalledWith(200);

    expect(json).toHaveBeenCalledWith({
      success: true,
      data: [{ id: '1' }],
    });
  });

  it('returns 404 when file not found', async () => {
    const { res, json, status } = createRes();

    (fileService.getFileById as jest.Mock).mockResolvedValue(null);

    await fileController.getById(
      { params: { id: '1' } } as any,
      res,
      jest.fn(),
    );

    expect(status).toHaveBeenCalledWith(404);

    expect(json).toHaveBeenCalledWith({
      success: false,
      message: 'File not found',
    });
  });

  it('deletes a file', async () => {
    const { res, json, status } = createRes();

    (
      fileService.deleteFile as jest.Mock
    ).mockResolvedValue({
      message: 'File deleted successfully',
    });

    await fileController.delete(
      { params: { id: '1' } } as any,
      res,
      jest.fn(),
    );

    expect(status).toHaveBeenCalledWith(200);

    expect(json).toHaveBeenCalledWith({
      success: true,
      message: 'File deleted successfully',
    });
  });
});