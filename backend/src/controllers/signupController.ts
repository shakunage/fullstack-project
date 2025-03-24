/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import { createUserRepository } from "../repositories/createUserRepository.ts";
import { addTokenRepository } from "../repositories/addTokenRepository.ts";
import { type UserSignupData, type UserSigninResponse, type Token } from "../interfaces";

const router: Router = express.Router();
const SECRET_KEY = "your_secret_key";

router.post(
  "/",
  async (req: Request<unknown, unknown, UserSignupData>, res: Response<Token | { message: string }>) => {
    try {
      console.log(req.body);
      const user: UserSigninResponse = await createUserRepository(req.body);
      const token: string = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "24h" });
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
