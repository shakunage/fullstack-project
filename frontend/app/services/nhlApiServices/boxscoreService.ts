import type { BoxscoreData } from "../../entities";

export async function getBoxscore(
  gameDate: string,
  game_id: string | number | undefined
): Promise<BoxscoreData> {
  const response = await fetch(`/games/${gameDate}/${game_id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
