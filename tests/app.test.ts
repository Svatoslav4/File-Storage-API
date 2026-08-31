import request from 'supertest';
import app from '@/app';
import { swaggerSpec } from '@/docs/swagger';

describe('app', () => {
  it('returns health response at root', async () => {
    const response = await request(app).get('/');

    expect(response.status).toBe(200);

    expect(response.body).toEqual({
      success: true,
      message: 'File Storage API Running',
    });
  });

  it('serves Swagger UI', async () => {
    const response = await request(app).get('/api-docs/');

    expect(response.status).toBe(200);
    expect(response.text).toContain('Swagger UI');
  });

  it('documents the real file API routes and upload field', () => {
    const spec = swaggerSpec as any;

    expect(spec.paths).toHaveProperty('/api/files/upload');
    expect(spec.paths).toHaveProperty('/api/files');
    expect(spec.paths).toHaveProperty('/api/files/{id}');

    const uploadRequest = spec.paths['/api/files/upload'].post.requestBody.content['multipart/form-data'];
    expect(uploadRequest.schema.properties).toHaveProperty('image');
  });
});