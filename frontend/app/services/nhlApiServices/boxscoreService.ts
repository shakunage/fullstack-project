import axios from "axios";
import type { BoxscoreData } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/gamecenter";

// API call to be used in boxscoreLoader
export async function getBoxscore(game_id: string | undefined): Promise<BoxscoreData> {
  return await axios.get<BoxscoreData>(`${API_URL}/${game_id}/boxscore`).then((res) => res.data);
}

// For further fetching after the intial page load (calls boxscoreLoader)
export async function fetchBoxscore(
  gameDate: string,
  game_id: string | number | undefined
): Promise<BoxscoreData> {
  const response = await fetch(`/games/${gameDate}/${game_id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}
