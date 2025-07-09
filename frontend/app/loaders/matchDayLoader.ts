import { getMatchDayGames } from "~/services/nhlApiServices/matchDayService";
import type { GameItem, MatchDay } from "~/entities";
import type { LoaderFunctionArgs } from "react-router";

export const matchDayLoader = async ({
  params,
}: LoaderFunctionArgs): Promise<MatchDay> => {
  const game_date = params.date ? params.date : "now";
  try {
    return await getMatchDayGames(game_date);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
