import { getStory } from "../services/nhlApiServices/gameStoryService";
import type { LoaderFunctionArgs } from "react-router";
import type { GameStory } from "../entities";

export const gameStoryLoader = async ({ params }: LoaderFunctionArgs) => {
  const game_id = params.game_id;
  try {
    const gameStory: GameStory = await getStory(game_id);
    return gameStory;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Error fetching data");
  }
};
