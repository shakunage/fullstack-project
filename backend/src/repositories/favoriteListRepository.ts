import { prisma } from "../dbserver/dbserver.ts";
import { type User } from "../models/User.ts";

export async function favoriteListRepository(
  user_id: User["id"],
  skip: number,
  take: number
): Promise<string[] | false> {
  try {
    const favoritegames = await prisma.game.findMany({
      where: {
        favoritedBy: {
          some: { id: user_id },
        },
      },
      select: { id: true },
      skip: skip, // Added skip
      take: take,
    });

    // Return true if the game is in the user's favorites (length > 0)
    return favoritegames.map((game) => game.id);
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw new Error("Failed to check favorite status");
  }
}

export async function countFavoriteGamesRepository(user_id: User["id"]): Promise<number> {
  try {
    const count = await prisma.game.count({
      where: {
        favoritedBy: {
          some: { id: user_id },
        },
      },
    });
    return count;
  } catch (error) {
    console.error("Error counting favorite games:", error);
    throw new Error("Failed to count favorite games");
  }
}
