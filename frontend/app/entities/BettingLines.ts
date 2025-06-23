import type { Team } from '~/entities/sub-entities';

export type BettingLinesData = {
  currentOddsDate: string;
  lastUpdatedUTC: string;
  bettingPartner: {
    partnerId: number;
    country: string;
    name: string;
    imageUrl: string;
    siteUrl: string;
    bgColor: string;
    textColor: string;
    accentColor: string;
  };
  games: {
    gameId: number;
    gameType: number;
    startTimeUTC: string;
    homeTeam: Team;
    awayTeam: Team;
  }[];
};
