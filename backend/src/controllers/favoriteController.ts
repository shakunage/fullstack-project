import express, { type Request, type Response, type Router } from 'express';
import { findUserByTokenRepository } from '../repositories/findUserRepository.ts';
import { validateTokenRepository } from '../repositories/validateTokenRepository.ts';
import { addFavoriteRepository } from '../repositories/addFavoriteRepository.ts';
import { removeFavoriteRepository } from '../repositories/removeFavoriteRepository.ts';
import { checkFavoriteRepository } from '../repositories/checkFavoriteRepository.ts';
import { type GameItem } from '../models/index.ts';
import { type UserSigninResponse } from '../dtos/index.ts';

const router: Router = express.Router();

router.post(
  '/',
  (
    req: Request<object, { message: string } | string, GameItem, { id?: string }>,
    res: Response<{ message: string } | string>
  ): void => {
    void (async () => {
      try {
        const token = req.cookies.token as string;
        if (!token) {
          res.status(204).json({ message: 'Not authenticated' });
          return;
        }
        const tokenValidity = await validateTokenRepository(token);
        if (!tokenValidity) {
          res.status(401).json({ message: 'Invalid token' });
          return;
        }
        const user: UserSigninResponse = await findUserByTokenRepository({ token });

        const game_id = req.query.id;

        if (!game_id || typeof game_id !== 'string') {
          res.status(400).json({ message: 'Game ID is required and needs to be in a valid format' });
          return;
        }

        await addFavoriteRepository(req.body, user.id);

        res.status(200).json({ message: 'Game favorited successfully' });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(400).json({ message: `An unknown error occured. Details: ${message}` });
      }
    })();
  }
);

router.delete(
  '/',
  (
    req: Request<object, { message: string }, unknown, { id?: string }>,
    res: Response<{ message: string }>
  ): void => {
    void (async () => {
      try {
        const token = req.cookies.token as string;
        if (!token) {
          res.status(401).json({ message: 'Not authenticated' });
          return;
        }

        const tokenValidity = await validateTokenRepository(token);
        if (!tokenValidity) {
          res.status(401).json({ message: 'Invalid token' });
          return;
        }

        const user: UserSigninResponse = await findUserByTokenRepository({ token });
        const game_id = req.query.id;

        if (!game_id || typeof game_id !== 'string') {
          res.status(400).json({ message: 'Game ID is required and must be a string' });
          return;
        }

        // Remove the game from user's favorites
        await removeFavoriteRepository(game_id, user.id);

        res.status(200).json({ message: 'Game removed from favorites' });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: `An error occurred: ${message}` });
      }
    })();
  }
);

router.get(
  '/',
  (
    req: Request<object, { message: string } | { favorited: boolean }, unknown, { id?: string }>,
    res: Response<{ message: string } | { favorited: boolean }>
  ): void => {
    void (async () => {
      try {
        const token = req.cookies.token as string;
        if (!token) {
          res.status(401).json({ message: 'Not authenticated' });
          return;
        }

        const tokenValidity = await validateTokenRepository(token);
        if (!tokenValidity) {
          res.status(401).json({ message: 'Invalid token' });
          return;
        }

        const user: UserSigninResponse = await findUserByTokenRepository({ token });
        const game_id = req.query.id;

        if (!game_id || typeof game_id !== 'string') {
          res.status(400).json({ message: 'Game ID is required and must be a string' });
          return;
        }

        const isFavorited = await checkFavoriteRepository(game_id, user.id);

        res.status(200).json({ favorited: isFavorited });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(500).json({ message: `An error occurred: ${message}` });
      }
    })();
  }
);

export default router;
