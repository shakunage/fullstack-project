import type {
  Venue,
  Team,
  TvBroadcast,
  Clock,
  PeriodDescriptor,
  GameOutcome,
} from "~/entities/sub-entities";

export type GameItem = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue: Venue;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: TvBroadcast[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: Team;
  homeTeam: Team;
  gameCenterLink: string;
  threeMinRecap: string;
  threeMinRecapFr: string;
  condensedGame: string;
  condensedGameFr: string;
  clock: Clock;
  neutralSite: boolean;
  venueTimezone: string;
  period: number;
  periodDescriptor: PeriodDescriptor;
  gameOutcome: GameOutcome;
  goals: {
    period: number;
    periodDescriptor: PeriodDescriptor;
    timeInPeriod: string;
    playerId: number;
    name: {
      default: string;
    };
    firstName: {
      default: string;
    };
    lastName: {
      default: string;
    };
    goalModifier: string;
    assists: {
      playerId: number;
      name: {
        default: string;
        cs?: string;
        sk?: string;
      };
      assistsToDate: number;
    }[];
    mugshot: string;
    teamAbbrev: string;
    goalsToDate: number;
    awayScore: number;
    homeScore: number;
    strength: string;
    highlightClipSharingUrl: string;
    highlightClipSharingUrlFr: string;
    highlightClip: number;
    highlightClipFr: number;
    discreteClip: number;
    discreteClipFr: number;
  }[];
};
