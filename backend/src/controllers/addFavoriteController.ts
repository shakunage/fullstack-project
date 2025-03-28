/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router } from "express";
import { findUserByToken } from "../repositories/findUserRepository.ts";
import { validateTokenRepository } from "../repositories/validateTokenRepository.ts";
import { addFavoriteRepository } from "../repositories/addFavoriteRepository.ts";
import { removeFavoriteRepository } from "../repositories/removeFavoriteRepository.ts";

const router: Router = express.Router();

router.post(
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
      
      const game_id = req.query.id;

      if (!game_id || typeof game_id !== 'string') {
        return res.status(400).json({ message: "Game ID is required and needs to be in a valid format" });
      }
      
      await addFavoriteRepository(game_id, user.id);

      res.status(200).json({ message: "Game favorited successfully" });

    } catch (error) {
      res.status(400).json({ message: `An unknown error occured. Details: ${error}` });
    }
  }
);

router.delete(
  "/",
  async (req: Request, res: Response<{ message: string }>) => {
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
      const game_id = req.query.id;

      if (!game_id || typeof game_id !== 'string') {
        return res.status(400).json({ message: "Game ID is required and must be a string" });
      }

      // Remove the game from user's favorites
      await removeFavoriteRepository(game_id, user.id);

      res.status(200).json({ message: "Game removed from favorites" });
    } catch (error) {
      res.status(500).json({ message: `An error occurred: ${error}` });
    }
  }
);

export default router;
