import getOrders from '@/actions/getOrders';
import { getUser } from '@/actions/getUser';
import getUserOrders from '@/actions/getUserOrders';
import InvalidData from '@/components/InvalidData';
import Container from '@/components/container/Container';
import Orders from '@/components/order/Orders';
import React from 'react';

const OrdersPage = async () => {
  const currentUser = await getUser();
  if (!currentUser) {
    return <InvalidData title='Access denied' />;
  }
  const orders = await getUserOrders(currentUser.id);

  if (!orders) {
    return <InvalidData title='No orders' />;
  }
  return (
    <div className='p-8'>
      <Container>
        <Orders orders={orders} />
      </Container>
    </div>
  );
};

export default OrdersPage;
