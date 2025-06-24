import express, { Request, Response, Router } from "express";
import { revokeTokenRepository } from "../repositories/revokeTokenRepository.ts";
import { type Token } from "../dtos/index.ts";

const router: Router = express.Router();

router.get("/", async (req: Request<{}, {}, Token>, res: Response<{ message: string }>) => {
  const token = req.cookies.token; 
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    await revokeTokenRepository(token);
    res.cookie("token", "", {
      httpOnly: true,
      sameSite: "strict",
      expires: new Date(0)
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "An unknown error occured" });
  }
});

export default router;
