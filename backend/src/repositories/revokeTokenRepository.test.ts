import { describe, it, expect, vi, beforeEach } from 'vitest';
import { revokeTokenRepository } from './revokeTokenRepository.ts';
import { prisma } from '../dbserver/dbserver.ts';

// Mock prisma
vi.mock('../dbserver/dbserver.ts', () => ({
  prisma: {
    authToken: {
      findFirst: vi.fn(),
      update: vi.fn(),
    },
  },
}));

describe('revokeTokenRepository', () => {
  const token = 'test-token';
  const authToken = {
    id: 1,
    token: token,
    userId: 'user-123',
    revoked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should successfully revoke a valid token', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(authToken);
    vi.mocked(prisma.authToken.update).mockResolvedValue({ ...authToken, revoked: true });

    await revokeTokenRepository(token);

    expect(prisma.authToken.findFirst).toHaveBeenCalledWith({
      where: { token: token, revoked: false },
    });
    expect(prisma.authToken.update).toHaveBeenCalledWith({
      where: { id: authToken.id },
      data: { revoked: true },
    });
  });

  it('should throw an error if the token is not found', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(null);

    await expect(revokeTokenRepository(token)).rejects.toThrow('Error: Auth token not found');
  });

  it('should throw an error if the database update fails', async () => {
    const dbError = new Error('Database error');
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(authToken);
    vi.mocked(prisma.authToken.update).mockRejectedValue(dbError);

    await expect(revokeTokenRepository(token)).rejects.toThrow(dbError);
  });
});
