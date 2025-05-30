import { type GenericFetchOptions, genericFetch } from "../genericApiService";
import type { StandingsItem } from "../../entities";

export async function getStandings(date: string): Promise<StandingsItem[]> {
  const fetchOptions: GenericFetchOptions<StandingsItem[]> = {
    method: "GET",
    endpoint: `/standings/${date}`, // Adjusted endpoint to be relative
    dataTransform: async (response) => {
      const fullResponseData = await response.json();
      if (fullResponseData && typeof fullResponseData === 'object' && 'standings' in fullResponseData && Array.isArray(fullResponseData.standings)) {
        return fullResponseData.standings as StandingsItem[];
      } else {
        console.error("Standings data is not in the expected format (expected object with a 'standings' array property):", fullResponseData);
        return []; 
      }
    },
    defaultValue: [],
  };
  try {
    // genericFetch will return defaultValue on error, so standingsResponse will be StandingsItem[] or the defaultValue
    const standingsResponse: StandingsItem[] = await genericFetch(fetchOptions);
    return standingsResponse;
  } catch (error) {
    console.error("Error fetching standings:", error);
    throw error; 
  };
};
