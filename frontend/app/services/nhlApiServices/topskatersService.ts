import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { TopSkaters } from "../../entities";

const API_URL = "http://reverseproxy:9998/api/v1/skater-stats-leaders/current";

export async function getTopSkaters(): Promise<TopSkaters> {
  const fetchOptions: GenericFetchOptions<TopSkaters> = {
    method: "GET",
    endpoint: API_URL,
    dataTransform: async (response) => (await response.json()) as TopSkaters,
    defaultValue: {} as TopSkaters,
  };
  try {
    const topSkatersResponse: TopSkaters = await genericFetch(fetchOptions);
    return topSkatersResponse;
  } catch (error) {
    console.error("Error fetching top skaters:", error);
    throw error;
  }
}
