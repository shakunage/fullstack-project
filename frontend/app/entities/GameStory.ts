import type {
  GameSummary,
  Team,
  Clock,
  PeriodDescriptor,
  TvBroadcast,
  Venue,
  VenueLocation,
} from '~/entities/sub-entities';

export type GameStory = {
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
  venueTimezone: string;
  tvBroadcasts: TvBroadcast[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: Team;
  homeTeam: Team;
  shootoutInUse: boolean;
  regPeriods: number;
  otInUse: boolean;
  tiesInUse: boolean;
  summary: GameSummary;
  periodDescriptor: PeriodDescriptor;
  clock: Clock;
};
