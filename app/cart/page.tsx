import { getUser } from '@/actions/getUser';
import CartDetails from '@/components/cart/CartDetails';
import Container from '@/components/container/Container';
import React from 'react';

const CartPage = async () => {
  const currentUser = await getUser();
  return (
    <div className='p-8'>
      <Container>
        <CartDetails currentUser={currentUser} />
      </Container>
    </div>
  );
};

export default CartPage;
