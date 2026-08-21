describe('config/env', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterEach(() => {
    process.env = originalEnv;
  });

  it('loads configuration from environment variables', () => {
    process.env.PORT = '4000';
    process.env.DATABASE_URL = 'postgres://db';
    process.env.CLOUDINARY_CLOUD_NAME = 'cloud';
    process.env.CLOUDINARY_API_KEY = 'key';
    process.env.CLOUDINARY_API_SECRET = 'secret';

    const { config } = require('@/config/env');

    expect(config.port).toBe(4000);
    expect(config.databaseUrl).toBe('postgres://db');
    expect(config.cloudinary.cloudName).toBe('cloud');
    expect(config.cloudinary.apiKey).toBe('key');
    expect(config.cloudinary.apiSecret).toBe('secret');
  });
});
