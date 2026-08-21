import { upload } from '@/config/multer';

describe('config/multer', () => {
  it('accepts supported image mime types', () => {
    const cb = jest.fn();
    const fileFilter = (upload as any).fileFilter;

    fileFilter({} as any, { mimetype: 'image/png' } as any, cb);

    expect(cb).toHaveBeenCalledWith(null, true);
  });

  it('rejects unsupported mime types', () => {
    const cb = jest.fn();
    const fileFilter = (upload as any).fileFilter;

    fileFilter({} as any, { mimetype: 'application/pdf' } as any, cb);

    expect(cb).toHaveBeenCalled();
    expect((cb.mock.calls[0][0] as Error).message).toBe(
      'Only PNG, JPEG and WEBP images are allowed',
    );
  });
});
