import { getLanding } from "../services/nhlApiServices/gameLandingService";
import type { LoaderFunctionArgs } from "react-router";
import type { GameLandingData } from "../entities";

export const gameLandingLoader = async ({ params }: LoaderFunctionArgs): Promise<GameLandingData> => {
  const game_id = params.game_id;
  try {
    const landingData: GameLandingData = await getLanding(game_id);
    return landingData;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
