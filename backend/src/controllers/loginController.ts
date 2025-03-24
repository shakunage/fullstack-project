/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../repositories/findUserRepository.ts";
import { addTokenRepository } from "../repositories/addTokenRepository.ts";
import { UserLoginData } from "../interfaces";

const router: Router = express.Router();
// TODO: replace with secure way of storing secret keys
const SECRET_KEY = "your_secret_key";

router.post(
  "/",
  async (req: Request<unknown, unknown, UserLoginData>, res: Response<string | { message: string }>) => {
    const { email, password } = req.body;
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      // Generate token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "24h" });

      // Save token to AuthToken table
      await addTokenRepository(token, user.id);

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000, // 24 hours
      });

      res.status(200).json({ message: "Signup successful" });
    } catch (error) {
      res.status(400).json({ message: `An unknown error occured. Details: ${error}` });
    }
  }
);

export default router;
