'use client';
import { CartContextProvider } from '@/hooks/useCart';
import React from 'react';

interface Props {
  children: React.ReactNode;
}

const CartProvider: React.FC<Props> = (props) => {
  console.log('cart provider');
  const { children } = props;
  return <CartContextProvider>{children}</CartContextProvider>;
};

export default CartProvider;
