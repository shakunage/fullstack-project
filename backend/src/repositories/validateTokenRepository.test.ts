import { describe, it, expect, vi, beforeEach } from 'vitest';
import { validateTokenRepository } from './validateTokenRepository.ts';
import { prisma } from '../dbserver/dbserver.ts';
import { checkAuthTokenValidity } from '../utils/checkAuthTokenValidity.ts';

// Mock dependencies
vi.mock('../dbserver/dbserver.ts', () => ({
  prisma: {
    authToken: {
      findFirst: vi.fn(),
    },
  },
}));

vi.mock('../utils/checkAuthTokenValidity.ts', () => ({
  checkAuthTokenValidity: vi.fn(),
}));

describe('validateTokenRepository', () => {
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

  it('should return true for a valid token', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(authToken);
    vi.mocked(checkAuthTokenValidity).mockReturnValue(true);

    const result = await validateTokenRepository(token);

    expect(prisma.authToken.findFirst).toHaveBeenCalledWith({
      where: { token: token, revoked: false },
    });
    expect(checkAuthTokenValidity).toHaveBeenCalledWith(token);
    expect(result).toBe(true);
  });

  it('should return false for an invalid token', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(authToken);
    vi.mocked(checkAuthTokenValidity).mockReturnValue(false);

    const result = await validateTokenRepository(token);

    expect(result).toBe(false);
  });

  it('should return false if the token is not found in the database', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(null);

    const result = await validateTokenRepository(token);

    expect(result).toBe(false);
  });

  it('should throw an error if the database query fails', async () => {
    const dbError = new Error('Database error');
    vi.mocked(prisma.authToken.findFirst).mockRejectedValue(dbError);

    await expect(validateTokenRepository(token)).rejects.toThrow(dbError);
  });
});
