import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { BoxscoreData } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/gamecenter";

// API call to be used in boxscoreLoader
export async function getBoxscore(game_id: string | undefined): Promise<BoxscoreData> {
  const fetchOptions: GenericFetchOptions<BoxscoreData> = {
    method: "GET",
    endpoint: `${API_URL}/${game_id}/boxscore`,
    dataTransform: async (response) => response.json() as Promise<BoxscoreData>,
    defaultValue: {} as BoxscoreData,
  };
  try {
    const boxscoreResponse: BoxscoreData = await genericFetch(fetchOptions);
    return boxscoreResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}

// For further fetching after the intial page load (calls boxscoreLoader thru internal API)
export async function fetchBoxscore(
  gameDate: string,
  game_id: string | number | undefined
): Promise<BoxscoreData> {
  const fetchOptions: GenericFetchOptions<BoxscoreData> = {
    method: "GET",
    endpoint: `/games/${gameDate}/${game_id}`,
    dataTransform: async (response) => response.json() as Promise<BoxscoreData>,
    defaultValue: {} as BoxscoreData,
  };
  try {
    const boxscoreResponse: BoxscoreData = await genericFetch(fetchOptions);
    return boxscoreResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}
