import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { GameStory } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/wsc/game-story";

export async function getStory(game_id: string | undefined): Promise<GameStory> {
  const fetchOptions: GenericFetchOptions<GameStory> = {
    method: "GET",
    endpoint: `${API_URL}/${game_id}`,
    dataTransform: async (response) => response.json() as Promise<GameStory>,
    defaultValue: {} as GameStory,
  };
  try {
    const landingResponse: GameStory = await genericFetch(fetchOptions);
    return landingResponse;
  } catch (error) {
    console.error("Error fetching boxscore:", error);
    throw error;
  }
}
