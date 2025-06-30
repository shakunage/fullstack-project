import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { GameItem } from "~/entities";
import { calculateTimeUntilStart } from "~/utils/calculateTimeUntilStart";


export function useTimeUntilStart(gameStartTimeUtc: GameItem["startTimeUTC"]) {
  const queryClient = useQueryClient();

  const { data: timeUntilStart } = useQuery({
      queryKey: ["timeUntilStart", gameStartTimeUtc],
      queryFn: () => calculateTimeUntilStart(gameStartTimeUtc),
      refetchInterval: 60000, // Refetch every minute
      refetchOnWindowFocus: false,
    });

    return { timeUntilStart };
}