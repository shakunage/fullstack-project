import type { GameItem } from '~/entities';

export type MatchDay = {
  prevDate: string;
  currentDate: string;
  nextDate: string;
  games: GameItem[];
};
