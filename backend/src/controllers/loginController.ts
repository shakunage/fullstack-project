import express, { type Request, type Response, type Router } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { findUserByEmailRepository } from '../repositories/findUserRepository.ts';
import { addTokenRepository } from '../repositories/addTokenRepository.ts';
import { type UserLoginData } from '../dtos/index.ts';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'your_secret_key';

router.post(
  '/',
  (
    req: Request<unknown, { message: string }, UserLoginData>,
    res: Response<{ message: string }>
  ): void => {
    void (async () => {
      try {
        const { email, password } = req.body;
        const user = await findUserByEmailRepository(email);
        if (!user) {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
          res.status(401).json({ message: 'Invalid email or password' });
          return;
        }

        const payload = {
          sub: user.id,
          iat: Math.floor(Date.now() / 1000),
        };
        // Generate token
        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '24h' });

        // Save token to AuthToken table
        await addTokenRepository(token, user.id);

        res.cookie('token', token, {
          httpOnly: true,
          sameSite: 'strict',
          maxAge: 24 * 60 * 60 * 1000, // 24 hours
        });

        res.status(200).json({ message: 'Login successful' });
      } catch (error: unknown) {
        const message = error instanceof Error ? error.message : String(error);
        res.status(400).json({ message: `An unknown error occured. Details: ${message}` });
      }
    })();
  }
);

export default router;
