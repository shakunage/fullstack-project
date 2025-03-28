import { Request, Response } from "express";
import { prisma } from "../dbserver/dbserver";
import jwt from "jsonwebtoken";

export async function checkFavoriteController(req: Request, res: Response): Promise<void> {
  try {
    const gameId = req.query.gameId as string;
    const token = req.cookies?.token as unknown as string;
    if (typeof token !== "string") {
      res.status(400).json({ error: "Invalid token" });
      return;
    }

    if (!gameId || !token) {
      res.status(400).json({ error: "Missing gameId or token" });
      return;
    }

    // Verify the JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string) as {
      userId: string;
    };
    const userId = decodedToken.userId;

    // Check if the game is favorited by the user
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        favoriteGames: {
          where: { id: gameId },
        },
      },
    });

    if (!user) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    const isFavorited = user.favoriteGames.length > 0;
    res.status(200).json({ isFavorited });
  } catch {
    res.status(500).json({ error: "Internal server error" });
  }
}
