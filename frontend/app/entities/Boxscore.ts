import type {
  Venue,
  TvBroadcast,
  Clock,
  PeriodDescriptor,
  PlayerStats,
  GameOutcome,
  Team,
  VenueLocation,
} from '~/entities/sub-entities';

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
  venue: Venue;
  venueLocation: VenueLocation;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: TvBroadcast[];
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
