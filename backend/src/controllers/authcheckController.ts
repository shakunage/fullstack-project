import express, { Request, Response, Router } from "express";
import { findUserByTokenRepository } from "../repositories/findUserRepository.ts";
import { validateTokenRepository } from "../repositories/validateTokenRepository.ts";

const router: Router = express.Router();


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
        res.cookie("token", "", {
          httpOnly: true,
          sameSite: "strict",
          expires: new Date(0)
        });
        return res.status(401).json({ message: "Invalid token" });
      }
      const user = await findUserByTokenRepository({ token: token });
      res.status(200).json(user.name);
    } catch (error) {
      res.status(400).json({ message: `An unknown error occured. Details: ${error}` });
    }
  }
);

export default router;
