import { describe, it, expect, vi, beforeEach } from 'vitest';
import { findUserByEmailRepository, findUserByTokenRepository } from './findUserRepository.ts';
import { prisma } from '../dbserver/dbserver.ts';
import { type UserToValidate, type Token, type UserSigninResponse } from '../dtos/index.ts';

// Mock prisma
vi.mock('../dbserver/dbserver.ts', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
    },
    authToken: {
      findFirst: vi.fn(),
    },
  },
}));

describe('findUserByEmailRepository', () => {
  const email = 'test@example.com';
  const user = {
    id: 'user-123',
    name: 'Test User',
    email: email,
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a user when a valid email is provided', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(user);

    const result = await findUserByEmailRepository(email);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { email } });
    expect(result).toEqual(user);
  });

  it('should throw an error if the user is not found', async () => {
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(findUserByEmailRepository(email)).rejects.toThrow(
      `Email ${email} does not match to any user`,
    );
  });
});

describe('findUserByTokenRepository', () => {
  const token: Token = { token: 'test-token' };
  const user: UserSigninResponse = {
    id: 'user-123',
    name: 'Test User',
    email: 'test@example.com',
  };
  const fullUser = {
    ...user,
    password: 'hashedPassword',
    createdAt: new Date(),
    updatedAt: new Date(),
  };
  const authToken = {
    id: 1,
    token: token.token,
    userId: user.id,
    revoked: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return a user when a valid token is provided', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(authToken);
    vi.mocked(prisma.user.findUnique).mockResolvedValue(fullUser);

    const result = await findUserByTokenRepository(token);

    expect(prisma.authToken.findFirst).toHaveBeenCalledWith({ where: { token: token.token } });
    expect(prisma.user.findUnique).toHaveBeenCalledWith({ where: { id: user.id } });
    expect(result).toEqual(expect.objectContaining(user));
  });

  it('should throw an error if the token is not found', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(null);

    await expect(findUserByTokenRepository(token)).rejects.toThrow(
      'Invalid token - please log in and try again',
    );
  });

  it('should throw an error if the user is not found', async () => {
    vi.mocked(prisma.authToken.findFirst).mockResolvedValue(authToken);
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);

    await expect(findUserByTokenRepository(token)).rejects.toThrow(
      'Invalid token - please log in and try again',
    );
  });
});
