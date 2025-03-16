import jwt from "jsonwebtoken";

const SECRET_KEY = "your_secret_key";

export function checkAuthTokenValidity(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    return false;
  }
}
