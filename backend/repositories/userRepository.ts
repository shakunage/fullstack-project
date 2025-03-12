import { prisma } from "../dbserver/db";
import bcrypt from 'bcryptjs';


export interface UserSignupData {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: string;
  username: string;
  email: string;
  createdAt: Date;
}

export async function createUser(userData: UserSignupData): Promise<UserResponse> {
    try {
      // Check if user with this email already exists
      const existingUserByEmail = await prisma.user.findUnique({
        where: { email: userData.email },
      });

      if (existingUserByEmail) {
        throw new Error('Email already in use');
      }

      // Check if username is already taken
      const existingUserByUsername = await prisma.user.findUnique({
        where: { username: userData.username },
      });

      if (existingUserByUsername) {
        throw new Error('Username already taken');
      }

      // Hash the password
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

      // Create the user
      const newUser = await prisma.user.create({
        data: {
          username: userData.username,
          email: userData.email,
          password: hashedPassword,
        },
      });

      // Return user without the password
      const { password, ...userWithoutPassword } = newUser;
      return userWithoutPassword as UserResponse;
    } catch (error) {
      // Re-throw Prisma errors with better messages
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Failed to create user');
    }
  }

// Find a user by their ID
export async function findUserById(id: string): Promise<UserResponse | null> {
    const user = await prisma.user.findUnique({
        where: { id },
    });

    if (!user) return null;

    // Return user without password
    const { password, ...userWithoutPassword } = user;
    return userWithoutPassword as UserResponse;
}

// Find a user by email - useful for login functionality
export async function findUserByEmail(email: string): Promise<(UserResponse & { password: string }) | null> {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    return user;
}