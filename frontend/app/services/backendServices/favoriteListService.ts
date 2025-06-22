import { genericFetch, type GenericFetchOptions } from "../genericApiService";
import type { GameItem } from "~/entities";

const API_URL = "http://backend:8080/favoritegames";

type FavoriteGamesServiceData = {
  favoriteGameList: GameItem[];
  currentPage: number;
  totalPages: number;
  totalGames: number;
};

export async function FavoriteListService(headers: string | null, page: number, limit: number) {
  const fetchOptions: GenericFetchOptions<FavoriteGamesServiceData> = {
    method: "GET",
    endpoint: API_URL,
    queryParameter: `page=${page}&limit=${limit}`,
    dataTransform: async (response) => await response.json() as FavoriteGamesServiceData,
    defaultValue: {
      favoriteGameList: [],
      currentPage: 0,
      totalPages: 0,
      totalGames: 0,
    },
    headers: headers ? { "Cookie": headers } : {},
  };

    try {
      const favoriteGamesResponse: FavoriteGamesServiceData = await genericFetch(fetchOptions);
      return favoriteGamesResponse;
    } catch (error) {
      console.error("Error fetching favorite games:", error);
      throw error;
    }
}



