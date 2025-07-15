import { describe, it, expect, vi, beforeEach } from 'vitest';
import { removeFavoriteRepository } from './removeFavoriteRepository.ts';
import { GameModel } from '../mongo/schemas/GameSchema.ts';
import redisClient from '../redis/redisClient.ts';

// Mock dependencies
vi.mock('../mongo/schemas/GameSchema.ts', () => ({
  GameModel: {
    updateOne: vi.fn(),
  },
}));

vi.mock('../redis/redisClient.ts', () => ({
  default: {
    del: vi.fn(),
  },
}));

describe('removeFavoriteRepository', () => {
  const gameId = 'game-123';
  const userId = 'user-123';
  const cacheKey = `user_favorites:${userId}`;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should remove a favorite and invalidate cache', async () => {
    vi.mocked(GameModel.updateOne).mockResolvedValue({} as any);
    vi.mocked(redisClient.del).mockResolvedValue(1);

    await removeFavoriteRepository(gameId, userId);

    expect(redisClient.del).toHaveBeenCalledWith(cacheKey);
    expect(GameModel.updateOne).toHaveBeenCalledWith(
      { id: gameId },
      { $pull: { favoritedBy: userId } },
    );
  });

  it('should handle Redis DEL error and still attempt to update DB', async () => {
    vi.mocked(redisClient.del).mockRejectedValue(new Error('Redis error'));
    vi.mocked(GameModel.updateOne).mockResolvedValue({} as any);

    await removeFavoriteRepository(gameId, userId);

    expect(GameModel.updateOne).toHaveBeenCalledWith(
      { id: gameId },
      { $pull: { favoritedBy: userId } },
    );
  });

  it('should throw an error if DB update fails', async () => {
    const dbError = new Error('DB error');
    vi.mocked(GameModel.updateOne).mockRejectedValue(dbError);

    await expect(removeFavoriteRepository(gameId, userId)).rejects.toThrow(dbError);
  });
});
