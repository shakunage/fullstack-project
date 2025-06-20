import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";
import type { GameItem } from "../models/GameItem.ts";
import { gameSchema, GameModel } from "../mongo/schemas/GameSchema.ts";
import mongoose from "../mongo/mongo.ts";
import redisClient from "../redis/redisClient.ts";

// TODO: implement caching with Redis
const FAVORITES_CACHE_PREFIX = 'user_favorites:';

export async function addFavoriteRepository(game: GameItem, user_id: User["id"]): Promise<void> {
  // Use 'Games' to match the model name used in mongoose.model('Games', ...)
  const Game = mongoose.models.Games || mongoose.model('Games', gameSchema);

  try {
    // Check if a document with the given game id already exists.
    const existingGame = await Game.findOne({ id: game.id }).exec();

    // If the game does not exist, create and save it.
    if (!existingGame) {
      const gameToSave = new Game(game);
      await gameToSave.save();
      console.log(`Game ID ${game.id} saved to MongoDB!`);
    } else {
     // Also add the user's ID to the game's `favoritedBy` array in MongoDB
      await existingGame.updateOne(
        { id: game.id },
        { $addToSet: { favoritedBy: user_id } }
      );
    }
  } catch (mongoError) {
    // Catch any errors from the database operations (findOne, save).
    console.error(`Error saving Game ID ${game.id} to MongoDB:`, mongoError);
    // Re-throw a more specific and informative error.
    throw new Error(`Failed to save favorite game ${game.id} to MongoDB.`);
  }
}


