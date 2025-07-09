import express from "express";
import cookieParser from "cookie-parser";
import { prisma } from "./dbserver/dbserver.ts";
import SignupRouter from "./controllers/signupController.ts";
import LogoutRouter from "./controllers/logoutController.ts";
import LoginRouter from "./controllers/loginController.ts";
import AuthcheckRouter from "./controllers/authcheckController.ts";
import FavoriteRouter from "./controllers/favoriteController.ts";
import FavoriteListRouter from "./controllers/favoriteListController.ts";
import HealthcheckRouter from "./controllers/healthcheckRouter.ts";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/signup", SignupRouter);
app.use("/logout", LogoutRouter);
app.use("/login", LoginRouter);
app.use("/authcheck", AuthcheckRouter);
app.use("/favorite", FavoriteRouter);
app.use("/favoritegames", FavoriteListRouter);
app.use("/health", HealthcheckRouter);

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
