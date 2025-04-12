import axios from "axios";
import type { BoxscoreData } from "../../entities";

const API_URL = "http://localhost:9998/api/v1/gamecenter";

export async function getBoxscore(game_id: string | number | undefined): Promise<BoxscoreData> {
  console.log("url is", `${API_URL}/${game_id}/boxscore`);
  return axios
        .get(`${API_URL}/${game_id}/boxscore`)
        .then((res) => res.data);
}