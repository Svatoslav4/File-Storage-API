import { uploadImage } from '@/middlewares/upload.middleware';

describe('upload.middleware', () => {
  it('exports an upload middleware', () => {
    expect(uploadImage).toBeDefined();
    expect(typeof uploadImage).toBe('function');
  });
});
