import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
import type { GameStory } from '~/entities';

export async function getStoryService(game_id: string | undefined): Promise<GameStory> {
  const fetchOptions: GenericFetchOptions<GameStory> = {
    method: 'GET',
    endpoint: `${process.env.NHL_API_URL}/wsc/game-story/${game_id}`, // Adjusted endpoint to be relative
    dataTransform: async (response) => response.json() as Promise<GameStory>,
    defaultValue: {} as GameStory,
  };
  try {
    const landingResponse: GameStory = await genericFetch(fetchOptions);
    return landingResponse;
  } catch (error) {
    console.error('Error fetching boxscore:', error);
    throw error;
  }
}
