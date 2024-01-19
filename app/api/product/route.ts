import { NextResponse } from 'next/server';
import prisma from '@/libs/prisma';
import { getUser } from '@/actions/getUser';

export async function POST(request: Request) {
  const currentUser = await getUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }

  const body = await request.json();
  const { name, description, price, brand, category, inStock, images } = body;
  const product = await prisma.product.create({
    data: {
      name,
      description,
      price: parseFloat(price),
      brand,
      category,
      inStock,
      images,
    },
  });

  return NextResponse.json(product);
}

export async function PUT(request: Request) {
  const currentUser = await getUser();

  if (!currentUser || currentUser.role !== 'ADMIN') {
    return NextResponse.error();
  }

  const body = await request.json();
  const { id, inStock } = body;
  const product = await prisma.product.update({
    where: {
      id: id,
    },
    data: {
      inStock: inStock,
    },
  });

  return NextResponse.json(product);
}
