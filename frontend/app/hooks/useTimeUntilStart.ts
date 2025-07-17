import { useQuery } from '@tanstack/react-query';
import type { GameItem } from '~/entities';
import { calculateTimeUntilStart } from '~/utils/calculateTimeUntilStart';

export function useTimeUntilStart(gameStartTimeUtc: GameItem['startTimeUTC']) {
  const { data: timeUntilStart } = useQuery({
    queryKey: ['timeUntilStart', gameStartTimeUtc],
    queryFn: () => calculateTimeUntilStart(gameStartTimeUtc),
    initialData: calculateTimeUntilStart(gameStartTimeUtc),
    refetchInterval: 60000, // Refetch every minute
    refetchOnWindowFocus: false,
  });

  return { timeUntilStart };
}
