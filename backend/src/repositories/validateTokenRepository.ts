import { prisma } from "../dbserver/dbserver.ts";
import { checkAuthTokenValidity } from "../utils/checkAuthTokenValidity.ts";
import { type Token } from "../interfaces";

// Find a user by email - useful for login functionality
export async function validateTokenRepository(token: Token): Promise<Boolean> {
  try {
    const existsInDb = await prisma.authToken.findFirst({
      where: { token: token.token, revoked: false },
    });
    if (existsInDb) {
      return checkAuthTokenValidity(existsInDb.token);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to validate token");
  }
  return false;
}
