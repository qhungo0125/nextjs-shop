import prisma from '@/libs/prisma';

interface Params {
  productId: string;
}

export default async function getProduct(params: Params) {
  try {
    const { productId } = params;

    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        reviews: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
      },
    });
    if (!product) {
      return null;
    }
    return product;
  } catch (err: any) {
    throw new Error(err);
  }
}
