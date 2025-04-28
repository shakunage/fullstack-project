import { prisma } from "../dbserver/dbserver.ts";
import { type UserToValidate, type Token, type UserSigninResponse } from "../interfaces";

export async function findUserByEmail(email: string): Promise<UserToValidate> {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error(`Email ${email} does not match to any user`);

  return user as UserToValidate;
}

export async function findUserByToken(token: Token): Promise<UserSigninResponse> {
  const tokenInDb = await prisma.authToken.findFirst({
    where: { token: token.token },
  });

  if (!tokenInDb) throw new Error(`Invalid token - please log in and try again`);

  const user = await prisma.user.findUnique({
    where: { id: tokenInDb.userId },
  });

  if (!user) throw new Error(`Invalid token - please log in and try again`);

  return user as UserSigninResponse;
}
