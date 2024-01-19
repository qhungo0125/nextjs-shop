import prisma from '@/libs/prisma';

export default async function getOrders() {
  try {
    const orders = await prisma.order.findMany({
      include: {
        user: true,
      },
      orderBy: {
        createDateTime: 'desc',
      },
    });
    return orders;
  } catch (err: any) {
    throw new Error(err);
  }
}
