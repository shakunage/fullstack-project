import express, { Request, Response, Router } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { findUserByEmail } from "../repositories/findUserRepository.ts";
import { addTokenRepository } from "../repositories/addTokenRepository.ts";

const router: Router = express.Router();
const SECRET_KEY = "your_secret_key";

export interface UserLoginData {
  email: string;
  password: string;
}

router.post(
  "/",
  async (req: Request<{}, {}, UserLoginData>, res: Response<string | { message: string }>) => {
    const { email, password } = req.body;
    console.log(email);
    console.log(password);
    try {
      const user = await findUserByEmail(email);
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid email or password" });
      }

      console.log(user, isPasswordValid);

      // Generate token
      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: "1h" });

      // Save token to AuthToken table
      await addTokenRepository(token, user.id);

      res.status(200).json(token);
    } catch (error) {
      res.status(400).json({ message: "An unknown error occured" });
    }
  }
);

export default router;
