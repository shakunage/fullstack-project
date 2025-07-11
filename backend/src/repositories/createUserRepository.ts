import { prisma } from '../dbserver/dbserver.ts';
import bcrypt from 'bcrypt';
import { type UserSigninResponse, type UserSignupData } from '../dtos/index.ts';

export async function createUserRepository(userData: UserSignupData): Promise<UserSigninResponse> {
  try {
    // Check if user with this email already exists
    const existingUserByEmail = await prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (existingUserByEmail) {
      throw new Error('Email already in use');
    }

    // Hash the password
    // TODO: replace with secure way of storing secrets
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Create the user
    const newUser = await prisma.user.create({
      data: {
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
      },
    });

    // Return user without the password - we are intentionally not returning the password for security reasons,
    // so disabling the linter rule is fine here 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword as UserSigninResponse;
  } catch (error) {
    // Re-throw Prisma errors with better messages
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to create user');
  }
}
