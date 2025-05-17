/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import express, { Request, Response, Router } from "express";
import { findUserByToken } from "../repositories/findUserRepository.ts";
import { validateTokenRepository } from "../repositories/validateTokenRepository.ts";
import {
  favoriteListRepository,
  countFavoriteGamesRepository,
} from "../repositories/favoriteListRepository.ts";

const router: Router = express.Router();

interface PaginatedFavoritesResponse {
  gameIds: string[];
  totalGames: number;
  currentPage: number;
  totalPages: number;
}

router.get(
  "/",
  async (req: Request, res: Response<PaginatedFavoritesResponse | false | { message: string }>) => {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    const page = parseInt(req.query.page as string) || 1; // Default to page 1
    const limit = 9; // As per requirement
    const skip = (page - 1) * limit;
    console.log("Page:", page);
    console.log("Skip:", skip);

    try {
      const tokenValidity = await validateTokenRepository(token);
      if (!tokenValidity) {
        return res.status(401).json({ message: "Invalid token" });
      }

      const user = await findUserByToken({ token: token });

      const [favoriteGameIds, totalGames] = await Promise.all([
        favoriteListRepository(user.id, skip, limit),
        countFavoriteGamesRepository(user.id),
      ]);

      if (favoriteGameIds === false) {
        // Handle repository error case
        return res.status(500).json({ message: "Failed to retrieve favorite games list" });
      }

      const totalPages = Math.ceil(totalGames / limit);

      res.status(200).json({
        gameIds: favoriteGameIds,
        totalGames,
        currentPage: page,
        totalPages,
      });
    } catch (error) {
      res.status(500).json({ message: `An error occurred: ${error}` });
    }
  }
);

export default router;
