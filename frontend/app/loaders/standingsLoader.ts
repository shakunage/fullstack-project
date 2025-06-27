import { getStandings } from "../services/nhlApiServices/standingsService";
import type { LoaderFunctionArgs } from "react-router";

export const standingsLoader = async ({ params }: LoaderFunctionArgs) => {
  const game_date = params.date ? params.date : "now";
  try {
    return await getStandings(game_date);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
