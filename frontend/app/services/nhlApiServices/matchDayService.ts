import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { GameItem } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/score";

export async function getMatchDayGames(game_date: string): Promise<GameItem[]> {
  const fetchOptions: GenericFetchOptions<GameItem[]> = {
    method: "GET",
    endpoint: `${API_URL}/${game_date}`,
    dataTransform: async (response) => {
      const fullResponseData = await response.json();
      if (fullResponseData && Array.isArray(fullResponseData.games)) {
        return fullResponseData.games as GameItem[];
      } else {
        console.error("Match day games data is not in the expected format (expected object with a 'games' array property):", fullResponseData);
        return [];
      }
    },
    defaultValue: [],
  };
  try {
    const matchDayGamesResponse: GameItem[] = await genericFetch(fetchOptions);
    return matchDayGamesResponse;
  } catch (error) {
    console.error("Error fetching match day games:", error);
    throw error;
  };
};
