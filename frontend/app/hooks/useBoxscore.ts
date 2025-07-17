import { useQuery } from '@tanstack/react-query';
import { fetchBoxscoreService } from '~/services/nhlApiServices/boxscoreService';
import type { Boxscore, GameStory } from '~/entities';

export function useBoxscore(id: GameStory['id']) {
  const {
    data: fetchedBoxscore,
    refetch,
    isFetching: isFetchingBoxscore,
    error: boxscoreError,
  } = useQuery<Boxscore, Error>({
    queryKey: ['boxscoreData', id],
    queryFn: () => fetchBoxscoreService(id),
    enabled: false,
    staleTime: 60 * 1000,
  });

  const refetchBoxscore = () => {
    if (!id) {
      return Promise.reject(new Error('Game date or ID is missing for fetching boxscore.'));
    }
    return refetch();
  };

  return { fetchedBoxscore, isFetchingBoxscore, refetchBoxscore, boxscoreError };
}
