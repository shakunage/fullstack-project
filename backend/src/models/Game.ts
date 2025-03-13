import type { User } from './User';

export type Game = {
    id: string;
    startTime: Date;
    gameType: string;
    homeTeam: string;
    awayTeam: string;
    scoreHome: number;
    scoreAway: number;
    final: string;
    season: string;
    venue: string;
    favoritedBy: User[];
  }
