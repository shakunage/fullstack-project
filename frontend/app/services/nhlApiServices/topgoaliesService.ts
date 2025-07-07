import { type GenericFetchOptions, genericFetch } from "~/services/genericApiService";
import type { TopGoalies } from "~/entities";

const API_URL = "http://reverseproxy:9998/api/v1/goalie-stats-leaders/current";

export async function getTopGoalies(): Promise<TopGoalies> {
  const fetchOptions: GenericFetchOptions<TopGoalies> = {
    method: "GET",
    endpoint: API_URL,
    dataTransform: async (response) => (await response.json()) as TopGoalies,
    defaultValue: {} as TopGoalies,
  };
  try {
    const topGoaliesResponse: TopGoalies = await genericFetch(fetchOptions);
    return topGoaliesResponse;
  } catch (error) {
    console.error("Error fetching top goalies:", error);
    throw error;
  }
}
