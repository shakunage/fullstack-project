import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";
import mongoose from "../mongo/mongo.ts";
import redisClient from "../redis/redisClient.ts";

// Define Mongoose schema and model at the top level
const gameIdSchema = new mongoose.Schema({
  id: String,
});

// Prevent OverwriteModelError if the model is already compiled
const GameId = mongoose.models.GameId || mongoose.model('GameId', gameIdSchema);

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

    // Save the game id to the MongoDB collection
    const gameToSave = new GameId({
      id: game_id,
    });

    try {
      await gameToSave.save();
      console.log(`Game ID ${game_id} saved to MongoDB!`);
    } catch (mongoError) {
      console.error(`Error saving Game ID ${game_id} to MongoDB:`, mongoError);
      // Optionally, re-throw or handle as needed, but for now, we'll log it
      throw new Error(`Failed to save favorite game ${game_id} to MongoDB`);
    }

  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create user");
  }
}
