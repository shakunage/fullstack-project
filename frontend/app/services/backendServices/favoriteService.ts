import axios, { type AxiosResponse, type Method } from "axios";
const API_URL = "http://localhost:9998/backend";

async function apiRequest<T>(
  method: Method,
  endpoint: string,
  dataTransform: (res: AxiosResponse) => T,
  defaultValue: T,
  queryParameter?: string,
  body?: object
): Promise<T> {
  try {
    const response = await axios({
      method,
      url: `${API_URL}${endpoint}${queryParameter ? queryParameter : ""}`,
      data: body || {},
      withCredentials: true,
    });


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
};
