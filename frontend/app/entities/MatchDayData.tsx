import type { GameItem } from "./GameItem";

export type MatchDayData = {
  prevDate: string;
  currentDate: string;
  nextDate: string;
  gameWeek: [];
  oddsPartners: [];
  games: GameItem[];
};
