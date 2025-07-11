import { prisma } from '../dbserver/dbserver.ts';

export async function revokeTokenRepository(token: string): Promise<void> {
  try {
    const authToken = await prisma.authToken.findFirst({
      where: { token: token, revoked: false },
    });

    if (!authToken) {
      throw new Error('Error: Auth token not found');
    }

    // Revoke the token
    await prisma.authToken.update({
      where: { id: authToken.id },
      data: { revoked: true },
    });

    return;
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error('Failed to revoke the auth token');
  }
}
