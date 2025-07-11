import { type LoaderFunctionArgs } from 'react-router';
import { FavoriteListService } from '~/services/backendServices/favoriteListService';
import type { GameItem } from '~/entities';

type FavoriteGamesServiceData = {
  favoriteGameList: GameItem[];
  currentPage: number;
  totalPages: number;
  totalGames: number;
};

export const favoritegamesLoader = async ({
  request,
}: LoaderFunctionArgs): Promise<FavoriteGamesServiceData> => {
  const url = new URL(request.url);
  const headers = request.headers.get('Cookie');
  const page = parseInt(url.searchParams.get('page') ?? '1'); // Default to page 1
  const limit = parseInt(url.searchParams.get('limit') ?? '9'); // Default to limit 9

  try {
    const favoriteGamesResponse: FavoriteGamesServiceData = await FavoriteListService(
      headers,
      page,
      limit
    );

    const { favoriteGameList, totalGames, currentPage, totalPages } = favoriteGamesResponse;

    if (!favoriteGameList || favoriteGameList.length === 0) {
      return { favoriteGameList: [], currentPage, totalPages, totalGames };
    } else return favoriteGamesResponse;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};
