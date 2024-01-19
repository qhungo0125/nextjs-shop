import { getUser } from '@/actions/getUser';
import { Review } from '@prisma/client';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function POST(request: Request) {
  const currentUser = await getUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();
  const { comment, rating, product, userId } = body;

  // const deliveredOrder = currentUser.orders.some(
  //   (order) =>
  //     order.products.find((item) => item.id === product.id) &&
  //     order.status === 'delivered',
  // );

  // const userReview = product?.reviews.find(
  //   (review: Review) => review.userId === currentUser.id,
  // );

  // if (userReview || !deliveredOrder) {
  //   return NextResponse.error();
  // }

  const review = await prisma.review.create({
    data: {
      comment,
      rating,
      productId: product.id,
      userId: currentUser.id,
    },
  });
  return NextResponse.json(review);
}
