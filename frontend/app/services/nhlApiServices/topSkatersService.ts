import { type GenericFetchOptions, genericFetch } from '~/services/genericApiService';
import type { TopSkaters } from '~/entities';

export async function getTopSkatersService(): Promise<TopSkaters> {
  const fetchOptions: GenericFetchOptions<TopSkaters> = {
    method: 'GET',
    endpoint: `${process.env.NHL_API_URL}/skater-stats-leaders/current`,
    dataTransform: async (response) => (await response.json()) as TopSkaters,
    defaultValue: {} as TopSkaters,
  };
  try {
    const topSkatersResponse: TopSkaters = await genericFetch(fetchOptions);
    return topSkatersResponse;
  } catch (error) {
    console.error('Error fetching top skaters:', error);
    throw error;
  }
}
