import express, { type Request, type Response, type Router } from 'express';
import jwt from 'jsonwebtoken';
import { createUserRepository } from '../repositories/createUserRepository.ts';
import { addTokenRepository } from '../repositories/addTokenRepository.ts';
import { type UserSignupData, type UserSigninResponse } from '../dtos/index.ts';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const SECRET_KEY: string = process.env.JWT_SECRET_KEY || "your_secret_key";


router.post(
  '/',
  (
    req: Request<unknown, { message: string }, UserSignupData>,
    res: Response<{ message: string }>
  ): void => {
    void (async () => {
      try {
        const user: UserSigninResponse = await createUserRepository(req.body);
        const token: string = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: '24h' });
        await addTokenRepository(token, user.id);
        res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });
        res.status(200).json({ message: 'Signup successful' });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(400).json({ message: `An unknown error occured. Details: ${message}` });
      }
    })();
  }
);

export default router;
