import { type GenericFetchOptions, genericFetch } from "~/services/genericApiService";
import type { GameLanding } from "~/entities";

const API_URL = "http://reverseproxy:9998/api/v1/gamecenter";

export async function getLandingService(game_id: number | string | undefined): Promise<GameLanding> {
  const fetchOptions: GenericFetchOptions<GameLanding> = {
    method: "GET",
    endpoint: `${API_URL}/${game_id}/landing`,
    dataTransform: async (response) => response.json() as Promise<GameLanding>,
    defaultValue: {} as GameLanding,
  };
  try {
    const landingResponse: GameLanding = await genericFetch(fetchOptions);
    return landingResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}
export async function fetchLandingService(game_id: string | number | undefined): Promise<GameLanding> {
  const fetchOptions: GenericFetchOptions<GameLanding> = {
    method: "GET",
    endpoint: `/resources/landing/${game_id}`,
    dataTransform: async (response) => response.json() as Promise<GameLanding>,
    defaultValue: {} as GameLanding,
  };
  try {
    const landingResponse: GameLanding = await genericFetch(fetchOptions);
    return landingResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}
