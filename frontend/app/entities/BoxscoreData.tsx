type Broadcast = {
  id: number;
  market: string;
  countryCode: string;
  network: string;
  sequenceNumber: number;
};

export type Team = {
  // Added export
  id: number;
  commonName: {
    default: string;
  };
  abbrev: string;
  score: number;
  sog: number;
  logo: string;
  darkLogo: string;
  placeName: {
    default: string;
  };
  placeNameWithPreposition: {
    default: string;
    fr?: string;
  };
};

type Clock = {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
};

type PeriodDescriptor = {
  number: number;
  periodType: string;
  maxRegulationPeriods: number;
};

type GameOutcome = {
  lastPeriodType: string;
};

export type PlayerStats = {
  playerId: number;
  sweaterNumber: number;
  name: {
    default: string;
    cs?: string;
    fi?: string;
    sk?: string;
    sv?: string;
  };
  position: string;
  goals: number;
  assists: number;
  points: number;
  plusMinus: number;
  pim: number;
  hits: number;
  powerPlayGoals: number;
  sog: number;
  faceoffWinningPctg: number;
  toi: string;
  blockedShots: number;
  shifts: number;
  giveaways: number;
  takeaways: number;
  evenStrengthShotsAgainst?: string;
  powerPlayShotsAgainst?: string;
  shorthandedShotsAgainst?: string;
  saveShotsAgainst?: string;
  savePctg?: number;
  evenStrengthGoalsAgainst?: number;
  powerPlayGoalsAgainst?: number;
  shorthandedGoalsAgainst?: number;
  goalsAgainst?: number;
  starter?: boolean;
  decision?: string;
  shotsAgainst?: number;
  saves?: number;
};

type PlayerByGameStats = {
  awayTeam: {
    forwards: PlayerStats[];
    defense: PlayerStats[];
    goalies: PlayerStats[];
  };
  homeTeam: {
    forwards: PlayerStats[];
    defense: PlayerStats[];
    goalies: PlayerStats[];
  };
};

export type BoxscoreData = {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  gameDate: string;
  venue: {
    default: string;
  };
  venueLocation: {
    default: string;
  };
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: Broadcast[];
  gameState: string;
  gameScheduleState: string;
  periodDescriptor: PeriodDescriptor;
  regPeriods: number;
  awayTeam: Team;
  homeTeam: Team;
  clock: Clock;
  playerByGameStats: PlayerByGameStats;
  summary: Record<string, unknown>;
  gameOutcome: GameOutcome;
};
