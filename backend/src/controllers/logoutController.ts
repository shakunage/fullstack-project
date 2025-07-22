import express, { Request, Response, Router } from 'express';
import { revokeTokenRepository } from '../repositories/revokeTokenRepository.ts';
import { type Token } from '../dtos/index.ts';

const router: Router = express.Router();

router.get('/', (req: Request<object, object, Token>, res: Response<{ message: string }>): void => {
  const token = req.cookies.token as string;
  if (!token) {
    res.status(401).json({ message: 'Not authenticated' });
    return;
  }
  revokeTokenRepository(token)
    .then(() => {
      res.cookie('token', '', {
        httpOnly: true,
        sameSite: 'strict',
        expires: new Date(0),
      });
      res.status(200).json({ message: 'Logged out successfully' });
    })
    .catch((error: unknown) => {
      res.status(400).json({ message: `An unknown error: ${error as string} occured` });
    });
});

export default router;
