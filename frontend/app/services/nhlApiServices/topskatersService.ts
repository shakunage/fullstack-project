import axios from "axios";
import type { TopSkaters } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/skater-stats-leaders/current";

export async function getTopSkaters(): Promise<TopSkaters> {
  return await axios.get(`${API_URL}`).then((res) => res.data);
}
