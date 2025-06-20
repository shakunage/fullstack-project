import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";
import type { GameItem } from "../models/GameItem.ts";
import { gameSchema } from "../mongo/schemas/GameItem.ts";
import mongoose from "../mongo/mongo.ts";
import redisClient from "../redis/redisClient.ts";
import { count } from "console";

const FAVORITES_CACHE_PREFIX = 'user_favorites:';

export async function addFavoriteRepository(game_id: Game["id"], user_id: User["id"]): Promise<void> {
  // invalidate redis cache for the user's favorites
  const cacheKey = `${FAVORITES_CACHE_PREFIX}${user_id}`;
  try {
    await redisClient.del(cacheKey);
    console.log(`Cache invalidated for ${cacheKey}`);
  } catch (error) {
    console.error('Redis DEL error:', error);
  }
  try {
    // This line is a placeholder, remove when implementing the actual functionality
    // Check if the game already exists
    const existingGame = await prisma.game.findUnique({
      where: { id: game_id },
    });

    // If the game doesn't exist, create it
    if (!existingGame) {
      await prisma.game.create({
        data: {
          id: game_id,
        },
      });
    }

    // Connect the game to the user's favoriteGames
    await prisma.user.update({
      where: { id: user_id },
      data: {
        favoriteGames: {
          connect: { id: game_id },
        },
      },
    });

  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create user");
  }
}

export async function saveFavoriteGame(game: GameItem): Promise<void> {
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
      // If the game already exists, you might want to log this or handle it as needed.
      console.log(`Game ID ${game.id} already exists in MongoDB. No action taken.`);
    }
  } catch (mongoError) {
    // Catch any errors from the database operations (findOne, save).
    console.error(`Error saving Game ID ${game.id} to MongoDB:`, mongoError);
    // Re-throw a more specific and informative error.
    throw new Error(`Failed to save favorite game ${game.id} to MongoDB.`);
  }
}
