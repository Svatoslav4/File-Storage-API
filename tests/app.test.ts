import request from 'supertest';
import app from '@/app';

describe('app', () => {
  it('returns health response at root', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: 'File Storage API Running',
    });
  });
});