import fileRoutes from '@/models/file/file.routes';

describe('file.routes', () => {
  it('registers upload, list, get and delete routes', () => {
    const routes = fileRoutes.stack
      .filter((layer: any) => layer.route)
      .map((layer: any) => ({
        path: layer.route.path,
        methods: Object.keys(layer.route.methods),
      }));

    expect(routes).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ path: '/upload', methods: expect.arrayContaining(['post']) }),
        expect.objectContaining({ path: '/', methods: expect.arrayContaining(['get']) }),
        expect.objectContaining({ path: '/:id', methods: expect.arrayContaining(['get']) }),
        expect.objectContaining({ path: '/:id', methods: expect.arrayContaining(['delete']) }),
      ])
    );
  });
});
