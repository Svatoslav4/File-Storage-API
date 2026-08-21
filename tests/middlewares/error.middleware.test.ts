import { errorMiddleware } from '@/middlewares/error.middleware';

describe('errorMiddleware', () => {
  it('returns a 500 response for Error instances', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as any;

    errorMiddleware(new Error('boom'), {} as any, res, jest.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ success: false, message: 'boom' });
  });

  it('returns a 500 response for unknown errors', () => {
    const json = jest.fn();
    const status = jest.fn(() => ({ json }));
    const res = { status } as any;

    errorMiddleware('unknown', {} as any, res, jest.fn());

    expect(status).toHaveBeenCalledWith(500);
    expect(json).toHaveBeenCalledWith({ success: false, message: 'Unknown error', error: 'unknown' });
  });
});
