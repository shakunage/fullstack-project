import express, { Request, Response, Router } from "express";
import { createUserRepository } from "../repositories/createUserRepository.ts";
import { addTokenRepository } from "../repositories/addTokenRepository.ts";
import jwt from "jsonwebtoken";

export interface UserSignupData {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  email: string;
}

interface Token {
  token: string;
}

const router: Router = express.Router();
const SECRET_KEY = "your_secret_key";

router.post(
  "/",
  async (req: Request<{}, {}, UserSignupData>, res: Response<Token | { message: string }>) => {
    try {
      console.log(req.body);
      const user: UserResponse = await createUserRepository(req.body);
      const token: string = jwt.sign({ id: user.id }, SECRET_KEY, { expiresIn: "6h" });
      await addTokenRepository(token, user.id);
      res.json({ token });
    } catch (error) {
      res.status(400).json({ message: "An unknown error occured" });
    }
  }
);

export default router;
