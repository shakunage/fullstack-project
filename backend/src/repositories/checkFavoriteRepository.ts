import { GameModel } from "../mongo/schemas/GameSchema.ts";

export async function checkFavoriteRepository(
  game_id: string,
  user_id: string
): Promise<boolean> {
  try {
    // Find the game with the given ID
    const game = await GameModel.findOne({ id: game_id });

    // If game not found, return false
    if (!game) {
      return false;
    }

    console.log(`Checking mongodb response: ${game.favoritedBy.includes(user_id)}`)

    // Return true if the user's ID is in the game's favoritedBy array
    return game.favoritedBy.includes(user_id);
  } catch (error) {
    console.error("Error checking favorite status:", error);
    throw new Error("Failed to check favorite status");
  }
}
