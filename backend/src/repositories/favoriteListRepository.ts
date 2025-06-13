import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type FavoriteGamesFromDb } from "../interfaces/FavoriteGamesFromDb.ts";
import redisClient from "../redis/redisClient.ts";

const FAVORITES_CACHE_PREFIX = 'user_favorites:';
const FAVORITES_CACHE_TTL = 3600; // 1 hour in seconds

export async function favoriteListRepository(
  user_id: User["id"],
  skip: number,
  take: number
): Promise<string[] | false> {
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;

  try {
    const cachedFavoriteGames = await redisClient.get(cacheKey);
    if (cachedFavoriteGames) {
      console.log(`Cache HIT for ${cacheKey}`);
      return JSON.parse(cachedFavoriteGames).slice(skip, (skip + take));
    }
  } catch (error) {
    console.error('Redis GET error:', error);
    // Proceed to fetch from DB if Redis fails
  }

  console.log(`Cache MISS for ${cacheKey}`);

  try {
    const favoriteGamesFromDb: FavoriteGamesFromDb[] = await prisma.game.findMany({
      where: {
        favoritedBy: {
          some: { id: user_id },
        },
      },
      select: { id: true },
      orderBy: {
        id: "desc", // Sort by id in descending order
      },
    });

    // Return true if the game is in the user's favorites (length > 0)
    try {
    // Store in Redis
    await redisClient.setex(
      cacheKey,
      FAVORITES_CACHE_TTL,
      JSON.stringify(favoriteGamesFromDb.map((game) => game.id))
    );
  } catch (error) {
    console.error('Redis SETEX error:', error);
  }

    return favoriteGamesFromDb.map((game) => game.id).slice(skip, (skip + take));
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw new Error("Failed to check favorite status");
  }
}

export async function countFavoriteGamesRepository(user_id: User["id"]): Promise<number> {
  try {
    const count = await prisma.game.count({
      where: {
        favoritedBy: {
          some: { id: user_id },
        },
      },
    });
    return count;
  } catch (error) {
    console.error("Error counting favorite games:", error);
    throw new Error("Failed to count favorite games");
  }
}
