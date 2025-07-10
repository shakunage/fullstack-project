import { getStoryService } from "~/services/nhlApiServices/gameStoryService";
import type { LoaderFunctionArgs } from "react-router";
import type { GameStory, MatchDay } from "~/entities";

export const gameStoryLoader = async ({ params }: LoaderFunctionArgs): Promise<GameStory> => {
  const game_id = params.game_id;
  try {
    const gameStory: GameStory = await getStoryService(game_id);
    return gameStory;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
