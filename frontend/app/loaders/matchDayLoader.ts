import { getMatchDayGames } from "../services/nhlApiServices/matchDayService";
import type { GameItem, ScheduleInfo } from "../entities";
import type { LoaderFunctionArgs } from "react-router";

export const matchDayLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<{
  games: GameItem[];
  prevDate: ScheduleInfo["prevDate"];
  currentDate: ScheduleInfo["currentDate"];
  nextDate: ScheduleInfo["nextDate"];
}> => {
  const game_date = params.date ? params.date : "now";
  try {
    return await getMatchDayGames(game_date);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
