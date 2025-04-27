import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";

export async function favoriteListRepository(user_id: User["id"]): Promise<string[] | false> {
  try {
    // Find the user with the given ID and include their favorite games
    const user = await prisma.user.findUnique({
      where: { id: user_id },
      include: { favoriteGames: true },
    });

    // Extract game IDs into the favoritegames variable
    const favoritegames = user?.favoriteGames.map((game) => game.id) || [];

    // If user not found, return false
    if (!user) {
      return false;
    }

    // Return true if the game is in the user's favorites (length > 0)
    return favoritegames;
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw new Error("Failed to check favorite status");
  }
}
