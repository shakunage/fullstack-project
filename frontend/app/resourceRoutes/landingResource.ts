import { getLanding } from "~/services/nhlApiServices/gameLandingService";
import type { LoaderFunctionArgs } from "react-router";
import type { GameLandingData } from "~/entities";

export async function loader({ params }: LoaderFunctionArgs) {
  const game_id = params.game_id;
  try {
    const matchDayData: GameLandingData = await getLanding(game_id);
    return new Response(JSON.stringify(matchDayData), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
}
