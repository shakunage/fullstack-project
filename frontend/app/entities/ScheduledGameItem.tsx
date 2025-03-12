export type ScheduledGameItem = {
  id: number;
  season: number;
  gameType: number;
  venue: {
    default: string;
  };
  neutralSite: boolean;
  startTimeUTC: string;
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  gameState: string;
  gameScheduleState: string;
  tvBroadcasts: {
    id: number;
    market: string;
    countryCode: string;
    network: string;
    sequenceNumber: number;
  }[];
  awayTeam: {
    id: number;
    commonName: {
      default: string;
    };
    placeName: {
      default: string;
    };
    placeNameWithPreposition: {
      default: string;
      fr: string;
    };
    abbrev: string;
    logo: string;
    darkLogo: string;
    awaySplitSquad: boolean;
    score: number;
  };
  homeTeam: {
    id: number;
    commonName: {
      default: string;
    };
    placeName: {
      default: string;
    };
    placeNameWithPreposition: {
      default: string;
      fr: string;
    };
    abbrev: string;
    logo: string;
    darkLogo: string;
    homeSplitSquad: boolean;
    score: number;
  };
  periodDescriptor: {
    number: number;
    periodType: string;
    maxRegulationPeriods: number;
  };
  gameOutcome: {
    lastPeriodType: string;
  };
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
