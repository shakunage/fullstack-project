import type { Scoring, ThreeStar, TeamGameStats, Penalty } from '~/entities/sub-entities';

export interface GameSummary {
  scoring: Scoring[];
  shootout: any[];
  threeStars: ThreeStar[];
  teamGameStats: TeamGameStats[];
  penalties?: Penalty[];
}
