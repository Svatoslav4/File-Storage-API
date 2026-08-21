jest.mock('cloudinary', () => ({
  v2: {
    config: jest.fn(),
  },
}));

jest.mock('@/config/env', () => ({
  config: {
    cloudinary: {
      cloudName: 'demo',
      apiKey: '123',
      apiSecret: 'secret',
    },
  },
}));

import cloudinary from '@/config/cloudinary';

describe('config/cloudinary', () => {
  it('exports the configured cloudinary client', () => {
    expect(cloudinary).toBeDefined();
  });
});
