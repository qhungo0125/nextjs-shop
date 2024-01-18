import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import prisma from '@/libs/prisma';
import { CartProductType } from '@/types/CartProduct';
import { getUser } from '@/actions/getUser';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: '2023-10-16',
});

const calculateOrderAmount = (products: CartProductType[]) => {
  const total = products.reduce((acc, product) => {
    return acc + product.price * product.quantity;
  }, 0);

  return total;
};

export async function POST(request: Request) {
  const currentUser = await getUser();

  if (!currentUser) {
    return NextResponse.json(
      {
        error: 'You must be logged in to make a purchase',
      },
      { status: 401 },
    );
  }

  const body = await request.json();
  const { items, payment_intent_id } = body;
  const total = calculateOrderAmount(items);

  const orderData = {
    user: { connect: { id: currentUser.id } },
    amount: total,
    currency: 'usd',
    status: 'pending',
    deliveryStatus: 'pending',
    paymentIntentId: payment_intent_id,
    products: items,
  };

  if (payment_intent_id) {
  } else {
    // create intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: total,
      currency: 'usd',
      automatic_payment_methods: { enabled: true },
    });
    orderData.paymentIntentId = paymentIntent.id;

    // create order
  }

  return NextResponse.json({});
}
