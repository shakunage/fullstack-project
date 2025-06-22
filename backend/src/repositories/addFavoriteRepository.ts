import { type User } from "../models/User.ts";
import type { GameItem } from "../models/GameItem.ts";
import { gameSchema, GameModel } from "../mongo/schemas/GameSchema.ts";
import mongoose from "../mongo/mongo.ts";
import redisClient from "../redis/redisClient.ts";

// TODO: implement caching with Redis
const FAVORITES_CACHE_PREFIX = 'user_favorites:';

export async function addFavoriteRepository(game: GameItem, user_id: User["id"]): Promise<void> {
  const Game = mongoose.models.Games || mongoose.model('Games', gameSchema);

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
  } catch (mongoError) {
    console.error(`Error saving Game ID ${game.id} to MongoDB:`, mongoError);
    throw new Error(`Failed to save favorite game ${game.id} to MongoDB.`);
  }
}
