import express from "express";
import cookieParser from "cookie-parser";
import { prisma } from "./dbserver/dbserver.ts";
import SignupController from "./controllers/signupController.ts";
import LogoutController from "./controllers/logoutController.ts";
import LoginController from "./controllers/loginController.ts";
import AuthcheckController from "./controllers/authcheckController.ts";
import FavoriteController from "./controllers/favoriteController.ts";
import FavoriteListController from "./controllers/favoriteListController.ts";
import HealthcheckController from "./controllers/healthcheckController.ts";

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cookieParser());

app.use("/signup", SignupController);
app.use("/logout", LogoutController);
app.use("/login", LoginController);
app.use("/authcheck", AuthcheckController);
app.use("/favorite", FavoriteController);
app.use("/favoritegames", FavoriteListController);
app.use("/health", HealthcheckController);

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
