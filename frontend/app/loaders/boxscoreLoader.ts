import { getBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { LoaderFunctionArgs } from "react-router";
import type { BoxscoreData } from "~/entities";

export const boxscoreLoader = async ({ params }: LoaderFunctionArgs): Promise<BoxscoreData> => {
  const game_id = params.game_id;
  try {
    const matchDayData: BoxscoreData = await getBoxscore(game_id);
    return matchDayData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
