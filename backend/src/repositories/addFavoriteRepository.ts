import type { GameItem, User } from '../models';
import { gameSchema } from '../mongo/schemas/GameSchema.ts';
import mongoose, { type Model, type Document, Error } from 'mongoose';
import redisClient from '../redis/redisClient.ts';

const FAVORITES_CACHE_PREFIX = 'user_favorites:';

// Omit 'id' from GameItem and extend Document to avoid type conflict
interface GameDocument extends Omit<GameItem, 'id'>, Document {}

const Game: Model<GameDocument> =
  (mongoose.models.Games as Model<GameDocument>) ||
  mongoose.model<GameDocument>('Games', gameSchema);

export async function addFavoriteRepository(game: GameItem, user_id: User['id']): Promise<void> {
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;
  try {
    // Invalidate redis cache for the user's favorites
    await redisClient.del(cacheKey);
    console.log(`Cache invalidated for ${cacheKey}`);

    const existingGame = await Game.findOne({ id: game.id }).exec();

    // If the game does not exist, create and save it.
    if (!existingGame) {
      game.favoritedBy = [user_id];
      const gameToSave = new Game(game);
      await gameToSave.save();
      console.log(`Game ID ${game.id} saved to MongoDB!`);
    } else {
      // If the game exists, add the user to the 'favoritedBy' array.
      await Game.updateOne({ id: game.id }, { $addToSet: { favoritedBy: user_id } });
    }
  } catch (error: unknown) {
    if (error instanceof Error.ValidationError) {
      for (const field in error.errors) {
        console.error(`Validation error for ${field}: ${error.errors[field].message}`);
      }
    }
    console.error('MongoDB error:', error);
    throw new Error(`Failed to save favorite game ${game.id} to MongoDB.`);
  }
}