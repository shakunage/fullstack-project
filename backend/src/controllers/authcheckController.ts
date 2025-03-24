/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router } from "express";
import { findUserByToken } from "../repositories/findUserRepository.ts";
import { validateTokenRepository } from "../repositories/validateTokenRepository.ts";
import { Token } from "../interfaces";

const router: Router = express.Router();
// TODO: replace with secure way of storing secret keys
const SECRET_KEY = "your_secret_key";

router.get(
  "/",
  async (req: Request, res: Response<string | { message: string }>) => {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(204).json({ message: "Not authenticated" });
    }
    try {
      const tokenValidity = await validateTokenRepository(token);
      if (!tokenValidity) {
        return res.status(401).json({ message: "Invalid token" });
      }
      const user = await findUserByToken({ token: token });
      res.status(200).json(user.name);
    } catch (error) {
      res.status(400).json({ message: `An unknown error occured. Details: ${error}` });
    }
  }
);

export default router;
