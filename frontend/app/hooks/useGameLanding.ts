import { useQuery } from '@tanstack/react-query';
import { fetchLandingService } from '~/services/nhlApiServices/gameLandingService';
import type { GameLanding, GameItem } from '~/entities';

export function useGameLanding(game_id: GameItem['id']) {
  const {
    data: fetchedLandingData,
    refetch,
    isFetching: isFetchingLanding,
    error: landingError,
  } = useQuery<GameLanding, Error>({
    queryKey: ['landingData', game_id],
    queryFn: () => fetchLandingService(game_id),
    enabled: false,
    staleTime: 60 * 1000,
  });

  const refetchLanding = () => {
    if (!game_id) {
      return Promise.reject(new Error('Game date or ID is missing for fetching boxscore.'));
    }
    return refetch();
  };

  return { fetchedLandingData, refetchLanding, isFetchingLanding, landingError };
}
