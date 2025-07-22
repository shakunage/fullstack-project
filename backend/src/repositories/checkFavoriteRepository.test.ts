import { describe, it, expect, vi, beforeEach } from 'vitest';
import { checkFavoriteRepository } from './checkFavoriteRepository.ts';
import { GameModel } from '../mongo/schemas/GameSchema.ts';

// Mock GameModel
vi.mock('../mongo/schemas/GameSchema.ts', () => ({
  GameModel: {
    findOne: vi.fn(),
  },
}));

describe('checkFavoriteRepository', () => {
  const gameId = 'game-123';
  const userId = 'user-123';

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return true if the user has favorited the game', async () => {
    const mockGame = {
      id: gameId,
      favoritedBy: [userId, 'user-456'],
    };
    vi.mocked(GameModel.findOne).mockResolvedValue(mockGame);

    const result = await checkFavoriteRepository(gameId, userId);

    expect(GameModel.findOne).toHaveBeenCalledWith({ id: gameId });
    expect(result).toBe(true);
  });

  it('should return false if the user has not favorited the game', async () => {
    const mockGame = {
      id: gameId,
      favoritedBy: ['user-456', 'user-789'],
    };
    vi.mocked(GameModel.findOne).mockResolvedValue(mockGame);

    const result = await checkFavoriteRepository(gameId, userId);

    expect(GameModel.findOne).toHaveBeenCalledWith({ id: gameId });
    expect(result).toBe(false);
  });

  it('should return false if the game is not found', async () => {
    vi.mocked(GameModel.findOne).mockResolvedValue(null);

    const result = await checkFavoriteRepository(gameId, userId);

    expect(GameModel.findOne).toHaveBeenCalledWith({ id: gameId });
    expect(result).toBe(false);
  });

  it('should throw an error if the database query fails', async () => {
    const dbError = new Error('Database error');
    vi.mocked(GameModel.findOne).mockRejectedValue(dbError);

    await expect(checkFavoriteRepository(gameId, userId)).rejects.toThrow(
      'Failed to check favorite status'
    );

    expect(GameModel.findOne).toHaveBeenCalledWith({ id: gameId });
  });
});
