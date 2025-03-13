import type { Game } from './Game';

export type User = {
    id: string;
    username: string;
    email: string;
    password: string;
    favoriteGames: Game[];
    createdAt: Date;
    updatedAt: Date;
  }