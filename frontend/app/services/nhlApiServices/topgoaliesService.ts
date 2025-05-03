import axios from "axios";
import type { TopGoalies } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/goalie-stats-leaders/current";

export async function getTopGoalies(): Promise<TopGoalies> {
  return await axios.get(`${API_URL}`).then((res) => res.data);
}
