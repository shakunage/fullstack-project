import { prisma } from "../dbserver/dbserver.ts";
import { checkAuthTokenValidity } from "../utils/checkAuthTokenValidity.ts";
import { type Token } from "../interfaces";

export async function validateTokenRepository(token: string): Promise<boolean> {
  console.log("Token in validateTokenRepository", token);
  try {
    const tokenInDb = await prisma.authToken.findUnique({
      where: { token: token },
    });
    if (tokenInDb) {
      return checkAuthTokenValidity(tokenInDb.token);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Failed to validate token");
  }
  return false;
}
