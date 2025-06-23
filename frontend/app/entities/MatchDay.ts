import type { GameItem } from '~/entities';

export type MatchDayData = {
  prevDate: string;
  currentDate: string;
  nextDate: string;
  gameWeek: [];
  oddsPartners: [];
  games: GameItem[];
};
