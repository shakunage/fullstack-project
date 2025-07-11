import { getTopGoaliesService } from '~/services/nhlApiServices/topGoaliesService';
import type { TopGoalies } from '~/entities';

export const topGoaliesLoader = async (): Promise<TopGoalies> => {
  try {
    return await getTopGoaliesService();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};
