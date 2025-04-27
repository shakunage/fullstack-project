import axios from "axios";
import type { StandingsItem } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/standings";

export async function getStandings(date: string): Promise<StandingsItem[]> {
  return await axios.get(`${API_URL}/${date}`).then((res) => res.data.standings);
}
