import { genericFetch, type GenericFetchOptions } from '~/services/genericApiService';
import type { GameItem } from '~/entities';

type FavoriteGamesServiceData = {
  favoriteGameList: GameItem[];
  currentPage: number;
  totalPages: number;
  totalGames: number;
};

export async function FavoriteListService(headers: string | null, page: number, limit: number) {
  const fetchOptions: GenericFetchOptions<FavoriteGamesServiceData> = {
    method: 'GET',
    endpoint: `${process.env.SSR_BACKEND_URL}/favoritegames`,
    queryParameter: `page=${page}&limit=${limit}`,
    dataTransform: async (response) => (await response.json()) as FavoriteGamesServiceData,
    defaultValue: {
      favoriteGameList: [],
      currentPage: 0,
      totalPages: 0,
      totalGames: 0,
    },
    headers: headers ? { Cookie: headers } : {},
  };

  try {
    console.log('Fetching favorite games with options:', fetchOptions);
    const favoriteGamesResponse: FavoriteGamesServiceData = await genericFetch(fetchOptions);
    return favoriteGamesResponse;
  } catch (error) {
    console.error('Error fetching favorite games:', error);
    throw error;
  }
}
