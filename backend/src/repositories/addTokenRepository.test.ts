import { describe, it, expect, vi, beforeEach } from 'vitest';
import { addTokenRepository } from './addTokenRepository.ts';
import { prisma } from '../dbserver/dbserver.ts';

// Mock prisma
vi.mock('../dbserver/dbserver.ts', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    authToken: {
      updateMany: vi.fn(),
      create: vi.fn(),
    },
  },
}));

describe('addTokenRepository', () => {
  const token = 'test-token';
  const userId = 'user-123';

  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should successfully add a token for an existing user', async () => {
    const user = {
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock prisma.user.findUnique to return a user
    vi.mocked(prisma.user.findUnique).mockResolvedValue(user);
    // Mock prisma.authToken.updateMany to resolve successfully
    vi.mocked(prisma.authToken.updateMany).mockResolvedValue({ count: 1 });
    // Mock prisma.authToken.create to resolve successfully
    vi.mocked(prisma.authToken.create).mockResolvedValue({
      id: 1,
      token: token,
      userId: userId,
      revoked: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    await addTokenRepository(token, userId);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prisma.authToken.updateMany).toHaveBeenCalledWith({
      where: { userId: userId },
      data: { revoked: true },
    });
    expect(prisma.authToken.create).toHaveBeenCalledWith({
      data: {
        token: token,
        userId: userId,
      },
    });
  });

  it('should throw an error if the user is not found', async () => {
    // Mock prisma.user.findUnique to return null (user does not exist)
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(addTokenRepository(token, userId)).rejects.toThrow('Error: User not found');

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prisma.authToken.updateMany).not.toHaveBeenCalled();
    expect(prisma.authToken.create).not.toHaveBeenCalled();
  });

  it('should throw a generic error if token creation fails', async () => {
    const user = {
      id: userId,
      name: 'Test User',
      email: 'test@example.com',
      password: 'hashedPassword',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    const dbError = new Error('Database connection lost');

    // Mock prisma.user.findUnique to return a user
    vi.mocked(prisma.user.findUnique).mockResolvedValue(user);
    // Mock prisma.authToken.updateMany to resolve successfully
    vi.mocked(prisma.authToken.updateMany).mockResolvedValue({ count: 1 });
    // Mock prisma.authToken.create to throw an error
    vi.mocked(prisma.authToken.create).mockRejectedValue(dbError);

    await expect(addTokenRepository(token, userId)).rejects.toThrow(dbError);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { id: userId },
    });
    expect(prisma.authToken.updateMany).toHaveBeenCalledWith({
      where: { userId: userId },
      data: { revoked: true },
    });
    expect(prisma.authToken.create).toHaveBeenCalledWith({
      data: {
        token: token,
        userId: userId,
      },
    });
  });
});
