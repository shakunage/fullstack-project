import { getBoxscoreService } from '~/services/nhlApiServices/boxscoreService';
import type { LoaderFunctionArgs } from 'react-router';
import type { Boxscore } from '~/entities';

export const boxscoreLoader = async ({ params }: LoaderFunctionArgs): Promise<Boxscore> => {
  const game_id = params.game_id;
  try {
    const matchDayData: Boxscore = await getBoxscoreService(game_id);
    return matchDayData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};
