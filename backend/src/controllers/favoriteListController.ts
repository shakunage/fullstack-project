import express, { type Request, type Response, type Router } from 'express';
import { findUserByTokenRepository } from '../repositories/findUserRepository.ts';
import { validateTokenRepository } from '../repositories/validateTokenRepository.ts';
import {
  favoriteListRepository,
  countFavoriteGamesRepository,
} from '../repositories/favoriteListRepository.ts';
import type { GameItem } from '../models';
import { type UserSigninResponse } from '../dtos/index.ts';

const router: Router = express.Router();

interface PaginatedFavoritesResponse {
  favoriteGameList: Omit<GameItem, 'favoritedBy'>[];
  totalGames: number;
  currentPage: number;
  totalPages: number;
}

router.get(
  '/',
  (
    req: Request<
      object,
      PaginatedFavoritesResponse | { message: string },
      unknown,
      { page?: string; limit?: string }
    >,
    res: Response<PaginatedFavoritesResponse | { message: string }>,
  ): void => {
    void (async () => {
      try {
        const token = req.cookies.token as string;
        if (!token) {
          res.status(401).json({ message: 'Not authenticated' });
          return;
        }

        const page = parseInt(req.query.page || '1', 10);
        const limit = parseInt(req.query.limit || '9', 10);
        const skip = (page - 1) * limit;

        const tokenValidity = await validateTokenRepository(token);
        if (!tokenValidity) {
          res.status(401).json({ message: 'Invalid token' });
          return;
        }

        const user: UserSigninResponse = await findUserByTokenRepository({ token });

        const [favoriteGames, totalGames] = await Promise.all([
          favoriteListRepository(user.id, skip, limit),
          countFavoriteGamesRepository(user.id),
        ]);

        const totalPages = Math.ceil(totalGames / limit);

        res.status(200).json({
          favoriteGameList: favoriteGames,
          totalGames,
          currentPage: page,
          totalPages,
        });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: `An error occurred: ${message}` });
      }
    })();
  },
);

export default router;
