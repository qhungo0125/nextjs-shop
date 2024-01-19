import prisma from '@/libs/prisma';

export default async function getUserOrders(userId: string) {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDateTime: 'desc',
      },
      where: {
        userId: userId,
      },
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}
