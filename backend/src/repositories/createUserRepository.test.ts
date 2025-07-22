import { describe, it, expect, vi, beforeEach, type Mock } from 'vitest';
import { createUserRepository } from './createUserRepository.ts';
import { prisma } from '../dbserver/dbserver.ts';
import bcrypt from 'bcrypt';

// Mock prisma and bcrypt
vi.mock('../dbserver/dbserver.ts', () => ({
  prisma: {
    user: {
      findUnique: vi.fn(),
      create: vi.fn(),
    },
  },
}));

vi.mock('bcrypt', () => ({
  __esModule: true,
  default: {
    hash: vi.fn(),
  },
}));

describe('createUserRepository', () => {
  beforeEach(() => {
    // Reset mocks before each test
    vi.clearAllMocks();
  });

  it('should successfully create a new user', async () => {
    const userData = {
      name: 'Test User',
      email: 'test@example.com',
      password: 'password123',
    };
    const hashedPassword = 'hashedPassword123';
    const newUser = {
      id: '1',
      name: 'Test User',
      email: 'test@example.com',
      password: hashedPassword,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock prisma.user.findUnique to return null (user does not exist)
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    // Mock bcrypt.hash to return a hashed password
    (bcrypt.hash as Mock).mockResolvedValue(hashedPassword);
    // Mock prisma.user.create to return the new user
    vi.mocked(prisma.user.create).mockResolvedValue(newUser);

    const result = await createUserRepository(userData);

    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(prisma.user.create).toHaveBeenCalledWith({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });
    expect(result).toEqual(
      expect.objectContaining({
        id: '1',
        name: 'Test User',
        email: 'test@example.com',
      })
    );
  });

  it('should throw an error if email already exists', async () => {
    const userData = {
      name: 'Test User',
      email: 'existing@example.com',
      password: 'password123',
    };
    const existingUser = {
      id: '2',
      name: 'Existing User',
      email: 'existing@example.com',
      password: 'hashedPasswordExisting',
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    // Mock prisma.user.findUnique to return an existing user
    vi.mocked(prisma.user.findUnique).mockResolvedValue(existingUser);

    await expect(createUserRepository(userData)).rejects.toThrow('Email already in use');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.hash).not.toHaveBeenCalled();
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it('should throw a generic error for other failures during user creation', async () => {
    const userData = {
      name: 'Test User',
      email: 'error@example.com',
      password: 'password123',
    };

    // Mock prisma.user.findUnique to return null
    vi.mocked(prisma.user.findUnique).mockResolvedValue(null);
    // Mock bcrypt.hash to throw an error
    (bcrypt.hash as Mock).mockRejectedValue(new Error('Bcrypt hashing failed'));

    await expect(createUserRepository(userData)).rejects.toThrow('Bcrypt hashing failed');
    expect(prisma.user.findUnique).toHaveBeenCalledWith({
      where: { email: userData.email },
    });
    expect(bcrypt.hash).toHaveBeenCalledWith(userData.password, 10);
    expect(prisma.user.create).not.toHaveBeenCalled();
  });
});
