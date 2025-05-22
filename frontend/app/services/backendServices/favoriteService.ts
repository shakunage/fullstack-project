import axios, { type AxiosResponse, type Method } from "axios";
import { favoritegamesLoader } from "~/loaders/favoritegamesLoader";
const API_URL = "http://localhost:9998/backend";

export const loader = favoritegamesLoader;

type PaginatedFavoritesResponse = {
  gameIds: string[];
  totalGames: number;
  currentPage: number;
  totalPages: number;
};

async function apiRequest<T>(
  method: Method,
  endpoint: string,
  dataTransform: (res: AxiosResponse) => T,
  defaultValue: T,
  queryParameter?: string,
  body?: object
): Promise<T> {
  try {
    console.log("API URL:", `${API_URL}${endpoint}${queryParameter ? queryParameter : ""}`);
    console.log("API Method:", method);
    console.log("API Body:", body);
    console.log("API Query Parameter:", queryParameter);
    console.log("API Default Value:", defaultValue);
    console.log("API Data Transform:", dataTransform);
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}${queryParameter ? queryParameter : ""}`,
      data: body || {},
      withCredentials: true,
    });

    console.log("favoriteGamesResponse in service:", response);

    const result = dataTransform(response);

    if (result === undefined) {
      throw new Error("An unexpected error occurred");
    }

    return result;
  } catch (error) {
    return defaultValue;
  }
}

export const FavoriteService = {
  checkFavorite: (gameId: number): Promise<boolean> =>
    apiRequest<boolean>("get", "/favorite", (res) => res.data.favorited, false, `?id=${gameId}`),

  addFavorite: (gameId: number): Promise<number> =>
    apiRequest<number>("post", "/favorite", (res) => res.status, 0, `?id=${gameId}`),

  removeFavorite: (gameId: number): Promise<number> =>
    apiRequest<number>("delete", "/favorite", (res) => res.status, 0, `?id=${gameId}`),

  getFavoriteList: (page?: number | 1, limit?: number | 9): Promise<PaginatedFavoritesResponse> =>
    apiRequest<PaginatedFavoritesResponse>(
      "get",
      `/favoritegames?page=${page}&limit=${limit}`,
      (res) => res.data,
      {} as PaginatedFavoritesResponse
    ),
};
