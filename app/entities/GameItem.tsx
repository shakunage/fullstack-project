export type GameItem = {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue: {
    default: string;
  };
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  tvBroadcasts: {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
  }[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: {
    id: number;
    name: {
      default: string;
    };
    abbrev: string;
    score: number;
    sog: number;
    logo: string;
  };
  homeTeam: {
    id: number;
    name: {
      default: string;
    };
    abbrev: string;
    score: number;
    sog: number;
    logo: string;
  };
  gameCenterLink: string;
  threeMinRecap: string;
  threeMinRecapFr: string;
  condensedGame: string;
  condensedGameFr: string;
  clock: {
    timeRemaining: string;
    secondsRemaining: number;
    running: boolean;
    inIntermission: boolean;
  };
  neutralSite: boolean;
  venueTimezone: string;
  period: number;
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  gameOutcome: {
    lastPeriodType: string;
  };
  goals: {
    period: number;
    periodDescriptor: {
      number: number;
      periodType: string;
      maxRegulationPeriods: number;
    };
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
