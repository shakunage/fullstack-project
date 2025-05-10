import { FavoriteService } from "~/services/backendServices/favoriteService";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { BoxscoreData } from "~/entities/BoxscoreData";

export const favoritegamesLoader = async () => {
  try {
    const favoriteGameIds = await FavoriteService.getFavoriteList();
    if (!favoriteGameIds || favoriteGameIds.length === 0) {
      return [];
    }
    const gameDetailsPromises = favoriteGameIds.map((id) => {
      return fetchBoxscore("0000-00-00", String(id)); // Pass a dummy date for gameDate
    });
    const gameDetailsResults = await Promise.all(gameDetailsPromises);
    // Sort games by startTimeUTC, latest to earliest, return games
    return gameDetailsResults
      .sort((a, b) => new Date(b.startTimeUTC).getTime() - new Date(a.startTimeUTC).getTime())
      .filter((detail) => detail != null) as BoxscoreData[];
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
