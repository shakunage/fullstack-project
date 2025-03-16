import express, { Request, Response, Router } from "express";
import { revokeTokenRepository } from "../repositories/revokeTokenRepository.ts";
import { type Token } from "../interfaces";

const router: Router = express.Router();

router.post("/", async (req: Request<{}, {}, Token>, res: Response<{ message: string }>) => {
  try {
    console.log(req.body);
    const { token } = req.body;
    await revokeTokenRepository(token);
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(400).json({ message: "An unknown error occured" });
  }
});

export default router;
