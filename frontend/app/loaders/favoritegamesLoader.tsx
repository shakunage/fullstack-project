import { type LoaderFunctionArgs } from "react-router";
import { FavoriteService } from "~/services/backendServices/favoriteService";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { BoxscoreData } from "~/entities/BoxscoreData";

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

export const favoritegamesLoader = async ({ params }: LoaderFunctionArgs) => {
  const page = params.page ? parseInt(params.page) : 1; // Default to page 1
  const limit = params.limit ? parseInt(params.limit) : 9; // Default to limit 9
  console.log("Page:", page);
  try {
    const favoriteGamesResponse: FavoriteGamesServiceData = await FavoriteService.getFavoriteList(
      page,
      limit
    );

    const { gameIds, totalGames, currentPage, totalPages } = favoriteGamesResponse;

    if (!gameIds || gameIds.length === 0) {
      return { games: [], currentPage, totalPages, totalGames };
    }
    const gameDetailsPromises = gameIds.map((gameId) => {
      return fetchBoxscore("0000-00-00", String(gameId)); // Pass a dummy date for gameDate
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
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
