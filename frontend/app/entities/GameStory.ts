export interface LocalizedString {
  default: string;
  fr?: string;
}

export interface Venue {
  default: string;
}

export interface TvBroadcast {
  id: number;
  market: string;
  countryCode: string;
  network: string;
  sequenceNumber: number;
}

export interface TeamInfo {
  id: number;
  name: LocalizedString;
  abbrev: string;
  placeName: LocalizedString;
  score: number;
  sog: number;
  logo: string;
}

export interface PeriodDescriptor {
  number: number;
  periodType: string;
  maxRegulationPeriods?: number; // Optional as it's not present in all instances
}

export interface Assist {
  playerId: number;
  firstName: LocalizedString;
  lastName: LocalizedString;
  name: LocalizedString;
  assistsToDate: number;
  sweaterNumber: number;
}

export interface Goal {
  situationCode: string;
  eventId: number;
  strength: string;
  playerId: number;
  firstName: LocalizedString;
  lastName: LocalizedString;
  name: LocalizedString;
  teamAbbrev: LocalizedString; // e.g. {"default": "FLA"}
  headshot: string;
  highlightClipSharingUrl: string;
  highlightClipSharingUrlFr: string;
  highlightClip: number;
  highlightClipFr: number;
  discreteClip: number;
  discreteClipFr: number;
  goalsToDate: number;
  awayScore: number;
  homeScore: number;
  leadingTeamAbbrev?: LocalizedString; // e.g. {"default": "FLA"}
  timeInPeriod: string;
  shotType: string;
  goalModifier: string;
  assists: Assist[];
  homeTeamDefendingSide: string;
  isHome: boolean;
}

export interface ScoringPeriod {
  periodDescriptor: PeriodDescriptor;
  goals: Goal[];
}

export interface ThreeStarPlayer {
  star: number;
  playerId: number;
  teamAbbrev: string; // Direct string, e.g., "FLA"
  headshot: string;
  name: string; // Direct string
  sweaterNo: number;
  position: string;
  goals: number;
  assists: number;
  points: number;
}

export interface TeamGameStat {
  category: string;
  awayValue: number | string; // Can be "0/2" for powerPlay or a number
  homeValue: number | string; // Can be "0/3" for powerPlay or a number
}

export interface GameSummary {
  scoring: ScoringPeriod[];
  shootout: any[]; // The example had an empty array; defined as any[]
  threeStars: ThreeStarPlayer[];
  teamGameStats: TeamGameStat[];
}

export interface ClockInfo {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
}

export interface GameStory {
  id: number;
  season: number;
  gameType: number;
  limitedScoring: boolean;
  gameDate: string; // Consider Date type if you parse it, but string matches JSON
  venue: Venue;
  venueLocation: Venue; // Reusing Venue type as structure is identical
  startTimeUTC: string; // Consider Date type
  easternUTCOffset: string;
  venueUTCOffset: string;
  venueTimezone: string;
  tvBroadcasts: TvBroadcast[];
  gameState: string;
  gameScheduleState: string;
  awayTeam: TeamInfo;
  homeTeam: TeamInfo;
  shootoutInUse: boolean;
  regPeriods: number;
  otInUse: boolean;
  tiesInUse: boolean;
  summary: GameSummary;
  periodDescriptor: PeriodDescriptor; // Root level period descriptor
  clock: ClockInfo;
}
