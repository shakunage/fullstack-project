import type { User } from "./User";

export type AuthToken = {
  id: number;
  token: string;
  userId: string;
  revoked: Boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
