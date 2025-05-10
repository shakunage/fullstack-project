import type { User } from "./User";

export type Game = {
  id: string;
  favoritedBy: User[];
};
