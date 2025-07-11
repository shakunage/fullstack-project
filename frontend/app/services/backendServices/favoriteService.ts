import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
import { type GameItem } from '~/entities';

const API_URL = 'http://localhost:9998/backend';

type FavoriteResponse = {
  favorited: boolean;
};

export async function checkFavoriteService(gameId: number): Promise<boolean> {
  const fetchOptions: GenericFetchOptions<boolean> = {
    method: 'GET',
    endpoint: `${API_URL}/favorite`,
    queryParameter: `id=${gameId}`,
    dataTransform: async (response) => {
      const fullResponseData = (await response.json()) as FavoriteResponse;
      if (
        fullResponseData &&
        typeof fullResponseData === 'object' &&
        'favorited' in fullResponseData &&
        typeof fullResponseData.favorited === 'boolean'
      ) {
        return fullResponseData.favorited;
      } else {
        console.error(
          'Reponse data is not in the expected format { favorited: boolean }',
          fullResponseData
        );
        return false;
      }
    },
    defaultValue: false,
    credentials: 'include', // Ensure cookies are sent with the request
  };
  try {
    const isFavorited: boolean = await genericFetch(fetchOptions);
    return isFavorited;
  } catch (error) {
    console.error('Error checking favorite status:', error);
    return false;
  }
}

export async function addFavoriteService(game: GameItem): Promise<boolean> {
  const fetchOptions: GenericFetchOptions<number> = {
    method: 'POST',
    endpoint: `${API_URL}/favorite`,
    queryParameter: `id=${game.id}`,
    dataTransform: (response) => Promise.resolve(response.status),
    defaultValue: 0,
    credentials: 'include',
    body: game,
  };
  try {
    const status: number = await genericFetch(fetchOptions);
    return status === 200;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
}
export async function removeFavoriteService(gameId: number): Promise<boolean> {
  const fetchOptions: GenericFetchOptions<number> = {
    method: 'DELETE',
    endpoint: `${API_URL}/favorite`,
    queryParameter: `id=${gameId}`,
    dataTransform: (response) => Promise.resolve(response.status),
    defaultValue: 0,
    credentials: 'include', // Ensure cookies are sent with the request
  };
  try {
    const status: number = await genericFetch(fetchOptions);
    return status === 200;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return false;
  }
}
