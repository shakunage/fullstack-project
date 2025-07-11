import express, { type Request, type Response, type Router } from 'express';
import { findUserByTokenRepository } from '../repositories/findUserRepository.ts';
import { validateTokenRepository } from '../repositories/validateTokenRepository.ts';
import { type UserSigninResponse } from '../dtos/index.ts';

const router: Router = express.Router();

router.get(
  '/',
  (
    req: Request,
    res: Response<string | { message: string }>,
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
          res.cookie('token', '', {
            httpOnly: true,
            sameSite: 'strict',
            expires: new Date(0),
          });
          res.status(401).json({ message: 'Invalid token' });
          return;
        }
        const user: UserSigninResponse = await findUserByTokenRepository({ token });
        res.status(200).json(user.name);
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(400).json({ message: `An unknown error occured. Details: ${message}` });
      }
    })();
  },
);

export default router;
