import express from "express";
import { prisma } from "./dbserver/dbserver.ts";
import SignupRouter from "./controllers/signupController.ts";
import LogoutRouter from "./controllers/logoutController.ts";
import LoginRouter from "./controllers/loginController.ts";

const app = express();
const PORT = 8080;

app.use(express.json());

app.use("/api/signup", SignupRouter);
app.use("/api/logout", LogoutRouter);
app.use("/api/login", LoginRouter);

const start = async () => {
  try {
    await prisma.$connect();
    console.log("Connected to the database");

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Error connecting to the database", error);
    process.exit(1);
  }
};

start();
