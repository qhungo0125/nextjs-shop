import { getUser } from '@/actions/getUser';
import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } },
) {
  const currentUser = await getUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }

  const product = await prisma.product.delete({
    where: {
      id: params.id,
    },
  });

  return NextResponse.json(product);
}
