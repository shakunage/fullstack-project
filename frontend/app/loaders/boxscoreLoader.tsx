import axios from "axios";
import type { LoaderFunctionArgs } from "react-router";
import type { BoxscoreData } from "../entities";

export const boxscoreLoader = async ({ params }: LoaderFunctionArgs) => {
  const game_id = params.game_id;
  try {
    const response = await axios.get<BoxscoreData>(
      `http://reverseproxy:9998/api/v1/gamecenter/${game_id}/boxscore`
    );
    const matchDayData: BoxscoreData = response.data;
    return matchDayData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
