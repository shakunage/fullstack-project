import axios from "axios";
import type { BoxscoreData } from "../../entities";


const API_URL = "http://reverseproxy:9998/api/v1/gamecenter";

export async function getMatchDayGames(game_id: number): Promise<BoxscoreData> {
  return axios
        .get(`${API_URL}/${game_id}/boxscore`)
        .then((res) => res.data);
}