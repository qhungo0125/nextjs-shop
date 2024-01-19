import { getUser } from '@/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function PUT(request: Request) {
  const currentUser = await getUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, deliveryStatus } = body;
  const product = await prisma.order.update({
    where: {
      id: id,
    },
    data: {
      deliveryStatus: deliveryStatus,
    },
  });

  return NextResponse.json(product);
}
