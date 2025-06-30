import type { PeriodDescriptor } from '~/entities/sub-entities/PeriodDescriptor';

export interface Penalty {
  periodDescriptor: PeriodDescriptor;
  penalties: PenaltyDetail[];
}

export interface PenaltyDetail {
  timeInPeriod: string;
  type: string;
  duration: number;
  committedByPlayer: { default: string };
  servedBy?: { default: string };
  teamAbbrev: { default: string };
  drawnBy: { default: string };
  descKey: string;
}
