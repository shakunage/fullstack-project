import type { Scoring, ThreeStars, TeamGameStats, Penalty } from "~/entities/sub-entities";

export interface GameSummary {
  scoring: Scoring[];
  shootout: any[];
  threeStars: ThreeStars[];
  teamGameStats: TeamGameStats[];
  penalties?: Penalty[];
}
