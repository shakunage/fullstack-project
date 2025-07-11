import { getLandingService } from '~/services/nhlApiServices/gameLandingService';
import type { LoaderFunctionArgs } from 'react-router';
import type { GameLanding } from '~/entities';

export const gameLandingLoader = async ({ params }: LoaderFunctionArgs): Promise<GameLanding> => {
  const game_id = params.game_id;
  try {
    const landingData: GameLanding = await getLandingService(game_id);
    return landingData;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw new Error('Error fetching data');
  }
};
