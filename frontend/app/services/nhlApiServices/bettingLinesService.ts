import axios from "axios";
import type { BettingLinesData } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/partner-game/US";

export async function getBettingLines(date: string): Promise<BettingLinesData> {
  console.log("fetching data from the url", `${API_URL}/${date}`);
  return await axios.get(`${API_URL}/${date}`).then((res) => res.data);
}
