import { genericFetch, type GenericFetchOptions } from "../genericApiService";

const API_URL = "http://backend:8080/favoritegames";

type FavoriteGamesServiceData = {
  gameIds: string[];
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
      gameIds: [],
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



