import axios from "axios";
import type { GameItem } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/score";

export async function getMatchDayGames(game_date: string): Promise<GameItem[]> {
  return axios
        .get(`${API_URL}/${game_date}`)
        .then((res) => res.data.games);
}