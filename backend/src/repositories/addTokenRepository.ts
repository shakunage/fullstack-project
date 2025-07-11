import { prisma } from '../dbserver/dbserver.ts';

export async function addTokenRepository(token: string, userId: string): Promise<void> {
  try {
    // Check if user with the given id exists
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new Error('Error: User not found');
    }

    await prisma.authToken.updateMany({
      where: { userId: userId },
      data: { revoked: true },
    });

    // Store the token into the database
    await prisma.authToken.create({
      data: {
        token: token,
        userId: userId,
      },
    });

    return;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to store token into the database');
  }
}
