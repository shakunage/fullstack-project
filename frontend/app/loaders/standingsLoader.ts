import { getStandings } from "../services/nhlApiServices/standingsService";
import type { LoaderFunctionArgs } from "react-router";
import type { StandingsItem } from "../entities";

export const standingsLoader = async ({ params }: LoaderFunctionArgs): Promise<StandingsItem[]>  => {
  const game_date = params.date ? params.date : "now";
  try {
    return await getStandings(game_date);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
