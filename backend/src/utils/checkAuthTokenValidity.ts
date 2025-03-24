import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export function checkAuthTokenValidity(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    console.error("Error while verifying token", error);
    console.log("Invalid token value:" + token);
    return false;
  }
}
