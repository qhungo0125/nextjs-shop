import prisma from '@/libs/prisma';

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return users;
  } catch (err: any) {
    throw new Error(err);
  }
}
