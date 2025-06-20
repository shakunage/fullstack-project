import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { GameLandingData } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/gamecenter";

export async function getLanding(game_id: number | string | undefined): Promise<GameLandingData> {
  const fetchOptions: GenericFetchOptions<GameLandingData> = {
    method: "GET",
    endpoint: `${API_URL}/${game_id}/landing`,
    dataTransform: async (response) => response.json() as Promise<GameLandingData>,
    defaultValue: {} as GameLandingData,
  };
  try {
    const landingResponse: GameLandingData = await genericFetch(fetchOptions);
    return landingResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}
export async function fetchLanding(game_id: string | number | undefined): Promise<GameLandingData> {
  const fetchOptions: GenericFetchOptions<GameLandingData> = {
    method: "GET",
    endpoint: `/resources/landing/${game_id}`,
    dataTransform: async (response) => response.json() as Promise<GameLandingData>,
    defaultValue: {} as GameLandingData,
  };
  try {
    const landingResponse: GameLandingData = await genericFetch(fetchOptions);
    return landingResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}
