export interface DefaultName {
  default: string;
}

export interface LocalizedString {
  default: string;
  fr?: string;
}

export interface NameDetails {
  default: string;
  cs?: string;
  fi?: string;
  sk?: string;
  sv?: string;
}

export interface Venue extends DefaultName {}
export interface VenueLocation extends DefaultName {}

export interface PeriodDescriptor {
  number: number;
  periodType: string;
  otPeriods?: number;
  maxRegulationPeriods: number;
}

export interface TvBroadcast {
  id: number;
  market: string;
  countryCode: string;
  network: string;
  sequenceNumber: number;
}

export interface TeamAbbrev extends DefaultName {}

export interface TeamData {
  id: number;
  commonName: DefaultName;
  abbrev: string;
  placeName: LocalizedString;
  placeNameWithPreposition: LocalizedString;
  score: number;
  sog: number;
  logo: string;
  darkLogo: string;
}

export interface Assist {
  playerId: number;
  firstName: NameDetails;
  lastName: NameDetails;
  name: NameDetails;
  assistsToDate: number;
  sweaterNumber: number;
}

export interface Goal {
  situationCode: string;
  eventId: number;
  strength: string;
  playerId: number;
  firstName: NameDetails;
  lastName: NameDetails;
  name: NameDetails;
  teamAbbrev: TeamAbbrev;
  headshot: string;
  highlightClipSharingUrl: string;
  highlightClipSharingUrlFr?: string;
  highlightClip: number;
  highlightClipFr?: number;
  discreteClip: number;
  discreteClipFr?: number;
  goalsToDate: number;
  awayScore: number;
  homeScore: number;
  leadingTeamAbbrev?: TeamAbbrev;
  timeInPeriod: string;
  shotType: string;
  goalModifier: string;
  assists: Assist[];
  pptReplayUrl: string;
  homeTeamDefendingSide: string;
  isHome: boolean;
}

export interface ScoringPeriod {
  periodDescriptor: PeriodDescriptor;
  goals: Goal[];
}

export interface ThreeStar {
  star: number;
  playerId: number;
  teamAbbrev: string; // Note: This is a direct string, not an object like other teamAbbrevs
  headshot: string;
  name: NameDetails;
  sweaterNo: number;
  position: string;
  goals: number;
  assists: number;
  points: number;
}

export interface Penalty {
  timeInPeriod: string;
  type: string;
  duration: number;
  committedByPlayer?: NameDetails; // Made optional
  teamAbbrev: TeamAbbrev;
  drawnBy?: NameDetails; // Made optional
  descKey: string;
  servedBy?: NameDetails; // Added for bench minors
}

export interface PenaltyPeriod {
  periodDescriptor: PeriodDescriptor;
  penalties: Penalty[];
}

export interface GameSummary {
  scoring: ScoringPeriod[];
  shootout: any[]; // Assuming it can be an array of any type if not empty
  threeStars: ThreeStar[];
  penalties: PenaltyPeriod[];
}

export interface ClockData {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
}

export type GameLandingData = {
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
  periodDescriptor: PeriodDescriptor;
  tvBroadcasts: TvBroadcast[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: TeamData;
  homeTeam: TeamData;
  shootoutInUse: boolean;
  regPeriods: number;
  otInUse: boolean;
  tiesInUse: boolean;
  summary: GameSummary;
  clock: ClockData;
};
