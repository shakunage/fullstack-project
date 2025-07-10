import { type GenericFetchOptions, genericFetch } from "~/services/genericApiService";
import type { StandingsItem } from "~/entities";

const API_BASE_URL = "http://reverseproxy:9998/api/v1";

export async function getStandingsService(date: string): Promise<StandingsItem[]> {
  const fetchOptions: GenericFetchOptions<StandingsItem[]> = {
    method: "GET",
    endpoint: `${API_BASE_URL}/standings/${date}`, // Adjusted endpoint to be relative
    dataTransform: async (response) => {
      const fullResponseData = await response.json();
      if (
        fullResponseData &&
        typeof fullResponseData === "object" &&
        "standings" in fullResponseData &&
        Array.isArray(fullResponseData.standings)
      ) {
        return fullResponseData.standings as StandingsItem[];
      } else {
        console.error(
          "Standings data is not in the expected format (expected object with a 'standings' array property):",
          fullResponseData
        );
        return [];
      }
    },
    defaultValue: [],
  };
  try {
    const standingsResponse: StandingsItem[] = await genericFetch(fetchOptions);
    return standingsResponse;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error;
  }
}
