import { getBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { LoaderFunctionArgs } from "react-router";
import type { Boxscore } from "~/entities";

export const boxscoreLoader = async ({ params }: LoaderFunctionArgs): Promise<Boxscore> => {
  const game_id = params.game_id;
  try {
    const matchDayData: Boxscore = await getBoxscore(game_id);
    return matchDayData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
