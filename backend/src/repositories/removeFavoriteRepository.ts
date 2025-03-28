import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";

export async function removeFavoriteRepository(game_id: Game["id"], user_id: User["id"]): Promise<void> {
  try {
    await prisma.user.update({
        where: { id: user_id },
        data: {
          favoriteGames: {
            disconnect: { id: game_id }
          }
        }
      });
  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to remove favorite user");
  }
}
