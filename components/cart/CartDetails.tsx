'use client';
import { useCart } from '@/hooks/useCart';
import Link from 'next/link';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';
import Heading from '../Heading';
import Button from '../button/Button';
import CartItem from './CartItem';
import { priceFormatter } from '@/utils/text';
import { useRouter } from 'next/navigation';
import { SafeUser } from '@/types';

interface Props {
  currentUser: SafeUser | null;
}

const CartDetails: React.FC<Props> = (props) => {
  const { currentUser } = props;
  const { products, clearCart, cartTotal } = useCart();
  const router = useRouter();

  if (!products || products.length === 0) {
    return (
      <div className='flex flex-col items-center'>
        <div className='text-2xl'>Cart is Empty</div>
        <div>
          <Link
            className='text-slate-500 flex items-center gap-1 mt-2'
            href={'/'}
          >
            <MdArrowBack size={24} />
            <span>Continue Shopping</span>
          </Link>
        </div>
      </div>
    );
  }
  return (
    <div>
      <Heading title='Shopping cart' center />
      <div className='grid grid-cols-5 text-xs gap-4 mb-2 items-center'>
        <div className='uppercase col-span-2 justify-self-start'>product</div>
        <div className='uppercase justify-self-center'>price</div>
        <div className='uppercase justify-self-center'>quantity</div>
        <div className='uppercase justify-self-end'>total</div>
      </div>
      <div>
        {products.map((product) => {
          return <CartItem key={product.id} product={product} />;
        })}
      </div>

      <div className='border-t-[1.5px] border-slate-200 py-4 flex justify-between gap-4'>
        <div className='w-[90px]'>
          <Button
            label='clear cart'
            onclick={() => {
              clearCart();
            }}
            small
            outLine
          />
        </div>
        <div className='text-sm flex flex-col gap-1 items-start'>
          <div>
            <div className='flex justify-between font-semibold text-base'>
              <span>subtotal:</span>
              <span>{priceFormatter(cartTotal)}</span>
            </div>
            <p>included taxes and shipping fee</p>
            <Button
              label={currentUser ? 'checkout' : 'Login to checkout'}
              onclick={() => {
                currentUser ? router.push('/checkout') : router.push('/login');
              }}
            />
            <Link
              className='text-slate-500 flex items-center gap-1 mt-2'
              href={'/'}
            >
              <MdArrowBack size={24} />
              <span>Continue Shopping</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetails;
