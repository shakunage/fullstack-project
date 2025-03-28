import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";

export async function addFavoriteRepository(game_id: Game["id"], user_id: User["id"]): Promise<void> {
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
          startTime: new Date(),
          gameType: "Regular Season",
          homeTeam: "Boston Bruins",
          awayTeam: "Toronto Maple Leafs",
          scoreHome: 3,
          scoreAway: 2,
          final: "Final",
          season: "2024-2025",
          venue: "TD Garden",
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
