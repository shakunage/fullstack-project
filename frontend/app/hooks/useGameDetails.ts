import { useQuery } from "@tanstack/react-query";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import { fetchLanding } from "~/services/nhlApiServices/gameLandingService";
import type { Boxscore, GameItem, GameLanding } from "~/entities";

export function useGameDetails(game_id: GameItem["id"]) {

  const { data, refetch, isFetching } = useQuery<{ boxscore: Boxscore; landing: GameLanding }>({
    queryKey: ["boxscoreLandingData", game_id],
    queryFn: async () => {
      const [boxscoreData, landingData] = await Promise.all([
        fetchBoxscore(game_id),
        fetchLanding(game_id),
      ]);
      return { boxscore: boxscoreData, landing: landingData };
    },
    enabled: false, // Don't run on mount
    staleTime: 60 * 1000, // 1 minute
  });

  return { data, refetch, isFetching };
}
