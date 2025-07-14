import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
import type { Boxscore } from '~/entities';

const API_URL = 'http://reverseproxy:9998/api/v1/gamecenter';

// API call to be used in boxscoreLoader (server-side)
export async function getBoxscoreService(game_id: string | undefined): Promise<Boxscore> {
  const fetchOptions: GenericFetchOptions<Boxscore> = {
    method: 'GET',
    endpoint: `${process.env.NHL_API_URL}/gamecenter/boxscore`,
    dataTransform: async (response) => response.json() as Promise<Boxscore>,
    defaultValue: {} as Boxscore,
  };
  try {
    const boxscoreResponse: Boxscore = await genericFetch(fetchOptions);
    return boxscoreResponse;
  } catch (error) {
    console.error('Error fetching boxscore:', error);
    throw error;
  }
}

// For further fetching after the intial page load (calls boxscoreLoader thru internal route API)
export async function fetchBoxscoreService(game_id: string | number | undefined): Promise<Boxscore> {
  const fetchOptions: GenericFetchOptions<Boxscore> = {
    method: 'GET',
    endpoint: `/resources/boxscore/${game_id}`,
    dataTransform: async (response) => response.json() as Promise<Boxscore>,
    defaultValue: {} as Boxscore,
  };
  try {
    const boxscoreResponse: Boxscore = await genericFetch(fetchOptions);
    return boxscoreResponse;
  } catch (error) {
    console.error('Error fetching boxscore:', error);
    throw error;
  }
}
