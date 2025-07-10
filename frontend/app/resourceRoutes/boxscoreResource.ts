import { getBoxscore } from "~/services/nhlApiServices/boxscoreService";
import type { LoaderFunctionArgs } from "react-router";
import type { Boxscore } from "~/entities";

export async function loader({ params }: LoaderFunctionArgs): Promise<Response> {
  const game_id = params.game_id;
  try {
    const matchDayData: Boxscore = await getBoxscore(game_id);
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
