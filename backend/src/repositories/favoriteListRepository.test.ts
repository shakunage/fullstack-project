import { describe, it, expect, vi, beforeEach } from 'vitest';
import { favoriteListRepository, countFavoriteGamesRepository } from './favoriteListRepository.ts';
import { GameModel } from '../mongo/schemas/GameSchema.ts';
import redisClient from '../redis/redisClient.ts';
import { type GameItem } from '../models/GameItem.ts';

// Mock dependencies
vi.mock('../mongo/schemas/GameSchema.ts', () => ({
  GameModel: {
    find: vi.fn(),
    countDocuments: vi.fn(),
  },
}));

vi.mock('../redis/redisClient.ts', () => ({
  default: {
    get: vi.fn(),
    setex: vi.fn(),
  },
}));

const mockGames: (GameItem & { favoritedBy: string[] })[] = [
  { id: 1, favoritedBy: ['user-123'] } as any,
  { id: 2, favoritedBy: ['user-123'] } as any,
  { id: 3, favoritedBy: ['user-123'] } as any,
];
const mockGamesWithoutFavoritedBy = mockGames.map(g => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { favoritedBy, ...rest } = g;
  return rest;
});

describe('favoriteListRepository', () => {
  const userId = 'user-123';
  const cacheKey = `user_favorites:${userId}`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return cached games if available', async () => {
    vi.mocked(redisClient.get).mockResolvedValue(JSON.stringify(mockGamesWithoutFavoritedBy));

    const result = await favoriteListRepository(userId, 0, 10);

    expect(redisClient.get).toHaveBeenCalledWith(cacheKey);
    expect(GameModel.find).not.toHaveBeenCalled();
    expect(result).toEqual(mockGamesWithoutFavoritedBy);
  });

  it('should fetch from DB, cache, and return games if not cached', async () => {
    const exec = vi.fn().mockResolvedValue(mockGames);
    const lean = vi.fn().mockReturnValue({ exec });
    const sort = vi.fn().mockReturnValue({ lean });
    vi.mocked(GameModel.find).mockReturnValue({ sort } as any);
    vi.mocked(redisClient.get).mockResolvedValue(null);

    const result = await favoriteListRepository(userId, 0, 10);

    expect(redisClient.get).toHaveBeenCalledWith(cacheKey);
    expect(GameModel.find).toHaveBeenCalledWith({ favoritedBy: userId });
    expect(redisClient.setex).toHaveBeenCalledWith(cacheKey, 3600, JSON.stringify(mockGamesWithoutFavoritedBy));
    expect(result).toEqual(mockGamesWithoutFavoritedBy);
  });

  it('should handle Redis GET error and fetch from DB', async () => {
    vi.mocked(redisClient.get).mockRejectedValue(new Error('Redis error'));
    const exec = vi.fn().mockResolvedValue(mockGames);
    const lean = vi.fn().mockReturnValue({ exec });
    const sort = vi.fn().mockReturnValue({ lean });
    vi.mocked(GameModel.find).mockReturnValue({ sort } as any);

    const result = await favoriteListRepository(userId, 0, 10);

    expect(result).toEqual(mockGamesWithoutFavoritedBy);
  });

  it('should handle Redis SETEX error and still return data', async () => {
    vi.mocked(redisClient.get).mockResolvedValue(null);
    vi.mocked(redisClient.setex).mockRejectedValue(new Error('Redis error'));
    const exec = vi.fn().mockResolvedValue(mockGames);
    const lean = vi.fn().mockReturnValue({ exec });
    const sort = vi.fn().mockReturnValue({ lean });
    vi.mocked(GameModel.find).mockReturnValue({ sort } as any);

    const result = await favoriteListRepository(userId, 0, 10);

    expect(result).toEqual(mockGamesWithoutFavoritedBy);
  });

  it('should throw an error if DB query fails', async () => {
    vi.mocked(redisClient.get).mockResolvedValue(null);
    const exec = vi.fn().mockRejectedValue(new Error('DB error'));
    const lean = vi.fn().mockReturnValue({ exec });
    const sort = vi.fn().mockReturnValue({ lean });
    vi.mocked(GameModel.find).mockReturnValue({ sort } as any);

    await expect(favoriteListRepository(userId, 0, 10)).rejects.toThrow('Failed to check favorite status');
  });

  it('should correctly paginate the results', async () => {
    vi.mocked(redisClient.get).mockResolvedValue(JSON.stringify(mockGamesWithoutFavoritedBy));
    const result = await favoriteListRepository(userId, 1, 1);
    expect(result).toEqual([mockGamesWithoutFavoritedBy[1]]);
  });
});

describe('countFavoriteGamesRepository', () => {
  const userId = 'user-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return the count of favorite games', async () => {
    vi.mocked(GameModel.countDocuments).mockResolvedValue(5);

    const result = await countFavoriteGamesRepository(userId);

    expect(GameModel.countDocuments).toHaveBeenCalledWith({ favoritedBy: userId });
    expect(result).toBe(5);
  });

  it('should throw an error if counting fails', async () => {
    vi.mocked(GameModel.countDocuments).mockRejectedValue(new Error('DB error'));

    await expect(countFavoriteGamesRepository(userId)).rejects.toThrow('Failed to count favorite games');
  });
});
