import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
import type { StandingsItem } from '~/entities';

export async function getStandingsService(date: string): Promise<StandingsItem[]> {
  const fetchOptions: GenericFetchOptions<StandingsItem[]> = {
    method: 'GET',
    endpoint: `${process.env.NHL_API_URL}/standings/${date}`, // Adjusted endpoint to be relative
    dataTransform: async (response) => {
      const fullResponseData = (await response.json()) as StandingsItem[];
      if (
        fullResponseData &&
        typeof fullResponseData === 'object' &&
        'standings' in fullResponseData &&
        Array.isArray(fullResponseData.standings)
      ) {
        return fullResponseData.standings;
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
    console.error('Error fetching standings:', error);
    throw error;
  }
}
