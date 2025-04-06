/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router } from "express";
import { findUserByToken } from "../repositories/findUserRepository.ts";
import { validateTokenRepository } from "../repositories/validateTokenRepository.ts";
import { favoriteListRepository } from "../repositories/favoriteListRepository.ts";

const router: Router = express.Router();

router.get(
  "/",
  async (req: Request, res: Response<string[] | false | { message: string }>) => {
    const token = req.cookies.token; 
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    
    try {
      const tokenValidity = await validateTokenRepository(token);
      if (!tokenValidity) {
        return res.status(401).json({ message: "Invalid token" });
      }
      
      const user = await findUserByToken({ token: token });

      const favoriteGames = await favoriteListRepository(user.id);

      res.status(200).json(favoriteGames);
    } catch (error) {
      res.status(500).json({ message: `An error occurred: ${error}` });
    }
  }
);

export default router;
