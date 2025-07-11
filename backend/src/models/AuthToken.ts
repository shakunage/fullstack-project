import type { User } from './User';

export type AuthToken = {
  id: number;
  token: string;
  userId: string;
  revoked: boolean;
  createdAt: Date;
  updatedAt: Date;
  user: User;
};
