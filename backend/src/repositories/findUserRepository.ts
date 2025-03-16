import { prisma } from "../dbserver/dbserver.ts";
import { type UserToValidate } from "../interfaces";

// Find a user by email - useful for login functionality
export async function findUserByEmail(email: string): Promise<UserToValidate> {
  console.log(email);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error(`Email ${email} does not match to any user`);

  return user as UserToValidate;
}
