import type { GameItem, User } from "../models";
import { gameSchema } from "../mongo/schemas/GameSchema.ts";
import mongoose from "../mongo/mongo.ts";
import redisClient from "../redis/redisClient.ts";

const FAVORITES_CACHE_PREFIX = 'user_favorites:';

export async function addFavoriteRepository(game: GameItem, user_id: User["id"]): Promise<void> {
  const Game = mongoose.models.Games || mongoose.model('Games', gameSchema);

  // Invalidate redis cache for the user's favorites
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;
  try {
    await redisClient.del(cacheKey);
    console.log(`Cache invalidated for ${cacheKey}`);
  } catch (error) {
    console.error('Redis DEL error:', error);
  }

  try {
    // TODO: check if the .exec call is necessary here
    const existingGame = await Game.findOne({ id: game.id }).exec();

    // If the game does not exist, create and save it.
    if (!existingGame) {
      game.favoritedBy = [user_id];
      const gameToSave = new Game(game);
      await gameToSave.save();
      console.log(`Game ID ${game.id} saved to MongoDB!`);
    } else {
      await Game.updateOne(
        { id: game.id },
        { $addToSet: { favoritedBy: user_id } }
      );
    }
  } catch (mongoError: any) {
    if (mongoError.name === 'ValidationError') {
      for (let field in mongoError.errors) {
        console.error(`Validation error for ${field}: ${mongoError.errors[field].message}`);
      }
    } else {
      console.error(`Error saving Game ID ${game.id} to MongoDB:`, mongoError);
      throw new Error(`Failed to save favorite game ${game.id} to MongoDB.`);
    }
    
  }
}
