import type { GameItem } from '~/entities/GameItem';

export type GameWeekItem = {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
};

export type OddsPartner = {
  partnerId: number;
  country: string;
  name: string;
  imageUrl: string;
  siteUrl: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
};

export type ScheduleInfo = {
  prevDate: string;
  nextDate: string;
  currentDate: string;
  gameWeek: GameWeekItem[];
  oddsPartners: OddsPartner[];
  games: GameItem[];
};
