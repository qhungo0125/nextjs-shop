import prisma from '@/libs/prisma';

interface Params {
  orderId: string;
}

export default async function getOrder(params: Params) {
  try {
    const { orderId } = params;

    const order = await prisma.order.findUnique({
      where: {
        id: orderId,
      },
    });
    if (!order) {
      return null;
    }
    return order;
  } catch (err: any) {
    throw new Error(err);
  }
}
