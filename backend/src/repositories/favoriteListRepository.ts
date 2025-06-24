import { type User } from "../models/User.ts";
import { GameModel } from "../mongo/schemas/GameSchema.ts";
import { type GameItem } from "../models/GameItem.ts";
import redisClient from "../redis/redisClient.ts";

const FAVORITES_CACHE_PREFIX = 'user_favorites:';
const FAVORITES_CACHE_TTL = 3600; // 1 hour in seconds

export async function favoriteListRepository(
  user_id: User["id"],
  skip: number,
  take: number
): Promise<GameItem[]> {
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;

  try {
    const cachedFavoriteGames = await redisClient.get(cacheKey);
    if (cachedFavoriteGames) {
      console.log(`Cache HIT for ${cacheKey}`);
      const favoriteGames: Omit<GameItem, "favoritedBy">[] = JSON.parse(cachedFavoriteGames);
      return favoriteGames.slice(skip, (skip + take));
    }
  } catch (error) {
    console.error('Redis GET error:', error);
    // Proceed to fetch from DB if Redis fails
  }

  console.log(`Cache MISS for ${cacheKey}`);

  try {
    const favoriteGamesFromDb = await GameModel
      // 1. Find documents where 'favoritedBy' array contains the user_id
      .find({ favoritedBy: user_id })
      // 3. Sort by the 'id' field in descending order (-1)
      .sort({ startTimeUTC: -1 })

      // 4. Ensure the result is plain JavaScript objects, not Mongoose documents
      .lean()

      // 5. Execute the query
      .exec();

    // Sanitize the output by removing the 'favoritedBy' field and save to redis
    const favoriteGamesWithoutFavoritedBy = favoriteGamesFromDb.map((game) => {
      const { favoritedBy, ...gameWithoutFavoritedBy } = game;
      return gameWithoutFavoritedBy;
    });

    try {
      // Store in Redis
      await redisClient.setex(
        cacheKey,
        FAVORITES_CACHE_TTL,
        JSON.stringify(favoriteGamesWithoutFavoritedBy)
      );
    } catch (error) {
      console.error('Redis SETEX error:', error);
    }

    return favoriteGamesWithoutFavoritedBy.slice(skip, (skip + take)) as GameItem[];
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw new Error("Failed to check favorite status");
  }
}

export async function countFavoriteGamesRepository(user_id: User["id"]): Promise<number> {
  try {
    const count = await GameModel.countDocuments({ favoritedBy: user_id });
    return count;
  } catch (error) {
    console.error("Error counting favorite games:", error);
    throw new Error("Failed to count favorite games");
  }
}
