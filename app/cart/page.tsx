import CartDetails from '@/components/cart/CartDetails';
import Container from '@/components/container/Container';
import React from 'react';

const CartPage = () => {
  return (
    <div className='p-8'>
      <Container>
        <CartDetails />
      </Container>
    </div>
  );
};

export default CartPage;
