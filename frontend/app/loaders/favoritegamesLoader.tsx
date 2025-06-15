import { type LoaderFunctionArgs } from "react-router";
import { FavoriteListService } from "~/services/backendServices/favoriteListService";
import type { BoxscoreData } from "~/entities/Boxscore";
import { getBoxscore } from "~/services/nhlApiServices/boxscoreService";

type FavoriteGamesServiceData = {
  gameIds: string[];
  currentPage: number;
  totalPages: number;
  totalGames: number;
};

type FavoriteGamesLoaderData = {
  games: BoxscoreData[];
  currentPage: number;
  totalPages: number;
  totalGames: number;
};

export const favoritegamesLoader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const headers = request.headers.get("Cookie");
  const page = parseInt(url.searchParams.get("page") ?? "1"); // Default to page 1
  const limit = parseInt(url.searchParams.get("limit") ?? "9"); // Default to limit 9

  try {
    const favoriteGamesResponse: FavoriteGamesServiceData = await FavoriteListService(
      headers,
      page,
      limit
    );

    const { gameIds, totalGames, currentPage, totalPages } = favoriteGamesResponse;

    if (!gameIds || gameIds.length === 0) {
      return { games: [], currentPage, totalPages, totalGames };
    }
    const gameDetailsPromises = gameIds.map((gameId) => {
      return getBoxscore(gameId); // Pass a dummy date for gameDate
    });
    const gameDetailsResults = await Promise.all(gameDetailsPromises);
    // Sort games by startTimeUTC, latest to earliest, return games
    const filteredGameDetailsResults = gameDetailsResults
      .sort((a, b) => new Date(b.startTimeUTC).getTime() - new Date(a.startTimeUTC).getTime())
      .filter((detail) => detail != null) as BoxscoreData[];
    return {
      games: filteredGameDetailsResults,
      currentPage,
      totalPages,
      totalGames,
    } as FavoriteGamesLoaderData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
