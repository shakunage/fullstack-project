import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";

export async function addFavoriteRepository(game_id: Game["id"], user_id: User["id"]): Promise<void> {
  try {
    // This line is a placeholder, remove when implementing the actual functionality
    const game = await prisma.game.create({
        data: {
          id: game_id, // Generate a random UUID since it doesn't have @default(uuid())
          startTime: new Date(), // Current date and time
          gameType: 'Regular Season',
          homeTeam: 'Boston Bruins',
          awayTeam: 'Toronto Maple Leafs',
          scoreHome: 3,
          scoreAway: 2,
          final: 'Final',
          season: '2024-2025',
          venue: 'TD Garden',
          // createdAt and updatedAt will be handled automatically
        },
    });

      await prisma.user.update({
        where: { id: user_id },
        data: {
          favoriteGames: {
            connect: { id: game_id }
          }
        }
      });
  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to create user");
  }
}
