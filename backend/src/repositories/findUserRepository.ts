import { prisma } from "../dbserver/dbserver.ts";

export interface UserSignupData {
  name: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  name: string;
  password: string;
  email: string;
}

// Find a user by their ID
export async function findUserById(id: string): Promise<UserResponse | null> {
  const user = await prisma.user.findUnique({
    where: { id },
  });

  if (!user) return null;

  // Return user without password
  return user as UserResponse;
}

// Find a user by email - useful for login functionality
export async function findUserByEmail(email: string): Promise<UserResponse> {
  console.log(email);
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) throw new Error(`Email ${email} does not match to any user`);

  return user as UserResponse;
}
