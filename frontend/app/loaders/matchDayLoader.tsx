import axios from "axios";
import type { MatchDayData } from "../entities";
import type { LoaderFunctionArgs } from "react-router";

export const matchDayLoader = async ({ params }: LoaderFunctionArgs) => {
  const game_date = params.date ? params.date : "now";
  try {
    const response = await axios.get<MatchDayData>(`http://reverseproxy:9998/api/v1/score/${game_date}`);
    const matchDayData: MatchDayData = response.data;
    return matchDayData.games;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
