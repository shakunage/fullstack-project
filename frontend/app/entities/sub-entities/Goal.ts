import type { Assist } from "~/entities/sub-entities";

export interface Goal {
  situationCode: string;
  eventId: number;
  strength: string;
  playerId: number;
  firstName: { default: string };
  lastName: { default: string };
  name: { default: string };
  teamAbbrev: { default: string };
  headshot: string;
  highlightClipSharingUrl?: string;
  highlightClip?: number;
  goalsToDate: number;
  awayScore: number;
  homeScore: number;
  leadingTeamAbbrev?: { default: string };
  timeInPeriod: string;
  shotType: string;
  goalModifier: string;
  assists: Assist[];
  homeTeamDefendingSide: string;
  isHome: boolean;
  pptReplayUrl?: string;
}
