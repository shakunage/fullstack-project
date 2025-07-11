import type { PeriodDescriptor } from './PeriodDescriptor';
import type { Goal } from '.';

export interface Scoring {
  periodDescriptor: PeriodDescriptor;
  goals: Goal[];
}
