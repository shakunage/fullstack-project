export type BettingLinesData = {
  currentOddsDate: string;
  lastUpdatedUTC: string;
  bettingPartner: BettingPartner;
  games: Game[];
};

export type BettingPartner = {
  partnerId: number;
  country: string;
  name: string;
  imageUrl: string;
  siteUrl: string;
  bgColor: string;
  textColor: string;
  accentColor: string;
};

export type Game = {
  gameId: number;
  gameType: number;
  startTimeUTC: string;
  homeTeam: Team;
  awayTeam: Team;
};

export type Team = {
  id: number;
  name: {
    default: string;
  };
  abbrev: string;
  logo: string;
  odds: Odds[];
};

export type Odds = {
  description: string;
  value: number;
  qualifier: string;
};
