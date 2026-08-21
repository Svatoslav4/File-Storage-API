const mockListen = jest.fn();

jest.mock('@/app', () => ({
  __esModule: true,
  default: {
    listen: mockListen,
  },
}));

jest.mock('@/config/env', () => ({
  config: { port: 3000 },
}));

jest.mock('colors', () => ({
  __esModule: true,
  default: {
    green: (value: string) => value,
  },
}));

import '@/server';

describe('server', () => {
  it('starts listening on configured port', () => {
    expect(mockListen).toHaveBeenCalledWith(3000, expect.any(Function));
  });
});
