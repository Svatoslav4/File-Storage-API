jest.mock('@prisma/client', () => ({
  PrismaClient: jest.fn().mockImplementation(() => ({
    file: {
      create: jest.fn(),
      findMany: jest.fn(),
      findUnique: jest.fn(),
      delete: jest.fn(),
    },
  })),
}));

import { prisma } from '@/config/prisma';

describe('config/prisma', () => {
  it('exports a prisma client instance', () => {
    expect(prisma).toBeDefined();
    expect(prisma.file).toBeDefined();
  });
});
