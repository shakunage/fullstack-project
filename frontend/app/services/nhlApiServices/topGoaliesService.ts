import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
import type { TopGoalies } from '~/entities';

export async function getTopGoaliesService(): Promise<TopGoalies> {
  const fetchOptions: GenericFetchOptions<TopGoalies> = {
    method: 'GET',
    endpoint: `${process.env.NHL_API_URL}/goalie-stats-leaders/current`, // Adjusted endpoint to be relative
    dataTransform: async (response) => (await response.json()) as TopGoalies,
    defaultValue: {} as TopGoalies,
  };
  try {
    const topGoaliesResponse: TopGoalies = await genericFetch(fetchOptions);
    return topGoaliesResponse;
  } catch (error) {
    console.error('Error fetching top goalies:', error);
    throw error;
  }
}
