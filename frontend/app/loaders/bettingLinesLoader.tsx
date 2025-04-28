import { getBettingLines } from "../services/nhlApiServices/bettingLinesService";
import type { LoaderFunctionArgs } from "react-router";

export const bettingLinesLoader = async ({ params }: LoaderFunctionArgs) => {
  const game_date = params.date ? params.date : "now";
  try {
    return await getBettingLines(game_date);
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
