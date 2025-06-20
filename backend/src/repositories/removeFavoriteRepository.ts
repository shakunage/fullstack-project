import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";
import redisClient from "../redis/redisClient.ts";
import { GameModel } from "../mongo/schemas/GameSchema.ts";

const FAVORITES_CACHE_PREFIX = 'user_favorites:';

export async function removeFavoriteRepository(game_id: Game["id"], user_id: User["id"]): Promise<void> {
  // invalidate redis cache for the user's favorites
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;
  try {
    await redisClient.del(cacheKey);
    console.log(`Cache invalidated for ${cacheKey}`);
  } catch (error) {
    console.error('Redis DEL error:', error);
  }
  try {
    await prisma.user.update({
        where: { id: user_id },
        data: {
          favoriteGames: {
            disconnect: { id: game_id }
          }
        }
      });

    // Also remove the user's ID from the game's `favoritedBy` array in MongoDB
    await GameModel.updateOne(
      { id: game_id },
      { $pull: { favoritedBy: user_id } }
    );
  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to remove favorite user");
  }
}
