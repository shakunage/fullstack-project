import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const SECRET_KEY: string = process.env.JWT_SECRET_KEY || 'your_secret_key';

export function checkAuthTokenValidity(token: string): boolean {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (error) {
    console.error('Error while verifying token', error);
    return false;
  }
}
