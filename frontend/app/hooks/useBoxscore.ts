import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { BoxscoreData, GameStory } from "~/entities";

export function useBoxscore(id: GameStory["id"]) {
  const queryClient = useQueryClient();

  const {
    data: fetchedBoxscoreData,
    refetch: refetchBoxscore,
    isFetching: isFetchingBoxscore,
    error: boxscoreError,
  } = useQuery<BoxscoreData, Error>({
    queryKey: ["boxscoreData", id],
    queryFn: async () => {
      if (!id) {
        throw new Error("Game date or ID is missing for fetching boxscore.");
      }
      return fetchBoxscore(id);
    },
    enabled: false,
    staleTime: 60 * 1000,
  });

  return { fetchedBoxscoreData, isFetchingBoxscore, refetchBoxscore, boxscoreError };
}
