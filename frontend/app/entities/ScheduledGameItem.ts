import type { Venue, Team, TvBroadcast, PeriodDescriptor, GameOutcome } from "~/entities/sub-entities";

export type ScheduledGameItem = {
  id: number;
  season: number;
  gameType: number;
  venue: Venue;
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  tvBroadcasts: TvBroadcast[];
  awayTeam: Team;
  homeTeam: Team;
  periodDescriptor: PeriodDescriptor;
  gameOutcome: GameOutcome;
  winningGoalie: {
    playerId: number;
    firstInitial: {
      default: string;
    };
    lastName: {
      default: string;
    };
  };
  winningGoalScorer: {
    playerId: number;
    firstInitial: {
      default: string;
    };
    lastName: {
      default: string;
    };
  };
  threeMinRecap: string;
  threeMinRecapFr: string;
  condensedGame: string;
  condensedGameFr: string;
  gameCenterLink: string;
};
