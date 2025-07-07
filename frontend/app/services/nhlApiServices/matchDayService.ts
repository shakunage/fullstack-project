import { type GenericFetchOptions, genericFetch } from "~/services/genericApiService";
import type { GameItem, ScheduleInfo } from "~/entities";
import type { MatchDay } from "~/entities/MatchDay";

const API_URL = "http://reverseproxy:9998/api/v1/score";

export async function getMatchDayGames(game_date: string): Promise<MatchDay> {
  const fetchOptions: GenericFetchOptions<ScheduleInfo> = {
    method: "GET",
    endpoint: `${API_URL}/${game_date}`,
    dataTransform: async (response) => {
      const fullResponseData = await response.json();
      if (fullResponseData) {
        return fullResponseData as ScheduleInfo;
      } else {
        console.error(
          "Match day games data is not in the expected format (expected object with a 'games' array property):",
          fullResponseData
        );
        return {} as ScheduleInfo;
      }
    },
    defaultValue: {} as ScheduleInfo,
  };
  try {
    const matchDayGamesResponse: ScheduleInfo = await genericFetch(fetchOptions);

    // If the game_date is "now" and no games are found, we fetch game info from the most recent match day
    if (game_date === "now" && matchDayGamesResponse.games.length === 0) {
      fetchOptions.endpoint = `${API_URL}/${matchDayGamesResponse.prevDate}`;
      const refetchedMatches: ScheduleInfo = await genericFetch(fetchOptions);
      return {
        games: refetchedMatches.games,
        prevDate: refetchedMatches.prevDate || "unknown",
        currentDate: refetchedMatches.currentDate || "unknown",
        nextDate: refetchedMatches.nextDate || "unknown",
      };
    }

    return {
      games: matchDayGamesResponse.games,
      prevDate: matchDayGamesResponse.prevDate || "unknown",
      currentDate: matchDayGamesResponse.currentDate || "unknown",
      nextDate: matchDayGamesResponse.nextDate || "unknown",
    };
  } catch (error) {
    console.error("Error fetching match day games:", error);
    throw error;
  }
}
