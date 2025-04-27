import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";
import { type Game } from "../models/Game.ts";

export async function checkFavoriteRepository(
  game_id: Game["id"],
  user_id: User["id"]
): Promise<boolean> {
  try {
    // Find the user with the given ID and include their favorite games
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      include: {
        favoriteGames: {
          where: { id: game_id },
          select: { id: true },
        },
      },
    });

    // If user not found, return false
    if (!user) {
      return false;
    }

    // Return true if the game is in the user's favorites (length > 0)
    return user.favoriteGames.length > 0;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw new Error("Failed to check favorite status");
  }
}
