import { useQuery } from "@tanstack/react-query";
import { fetchLanding } from "~/services/nhlApiServices/gameLandingService";
import type { GameLanding, GameItem } from "~/entities";

export function useGameLanding(game_id: GameItem["id"]) {

  const {
    data: fetchedLandingData,
    refetch: refetchLanding,
    isFetching: isFetchingLanding,
    error: landingError,
  } = useQuery<GameLanding, Error>({
    queryKey: ["landingData", game_id],
    queryFn: async () => {
      if (!game_id) {
        throw new Error("Game date or ID is missing for fetching boxscore.");
      }
      return fetchLanding(game_id);
    },
    enabled: false,
    staleTime: 60 * 1000,
  });

  return { fetchedLandingData, refetchLanding, isFetchingLanding, landingError };
}
