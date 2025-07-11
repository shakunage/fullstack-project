import redisClient from '../redis/redisClient.ts';
import { GameModel } from '../mongo/schemas/GameSchema.ts';

const FAVORITES_CACHE_PREFIX = 'user_favorites:';

export async function removeFavoriteRepository(game_id: string, user_id: string): Promise<void> {
  // invalidate redis cache for the user's favorites
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;
  try {
    await redisClient.del(cacheKey);
    console.log(`Cache invalidated for ${cacheKey}`);
  } catch (error) {
    console.error('Redis DEL error:', error);
  }
  try {
    await GameModel.updateOne({ id: game_id }, { $pull: { favoritedBy: user_id } });
  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to remove favorite user');
  }
}
