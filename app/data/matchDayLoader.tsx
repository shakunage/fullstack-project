import axios from 'axios'
import type { MatchDayData } from '../entities';

export async function matchDayLoader(): Promise<MatchDayData["games"]> {
    try {
        const response = await axios.get<MatchDayData>(`http://api-web.nhle.com/v1/score/now`);
        const matchDayData: MatchDayData = response.data;
        return matchDayData.games;
      } catch (error) {
        console.error('Error fetching data:', error);
        throw new Error('Error fetching data');
      }
};