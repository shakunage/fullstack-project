import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { BettingLinesData } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/partner-game/US";

export async function getBettingLines(date: string): Promise<BettingLinesData> {
  const fetchOptions: GenericFetchOptions<BettingLinesData> = {
    method: "GET",
    endpoint: `${API_URL}/${date}`,
    dataTransform: async (response) => await response.json() as BettingLinesData,
    defaultValue: {} as BettingLinesData,
  };
  try {
    const bettingLinesResponse: BettingLinesData = await genericFetch(fetchOptions);
    return bettingLinesResponse;
  } catch (error) {
    console.error("Error fetching betting lines:", error);
    throw error;
  };
};
