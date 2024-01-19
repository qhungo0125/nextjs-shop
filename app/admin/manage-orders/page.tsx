import getOrders from '@/actions/getOrders';
import { getUser } from '@/actions/getUser';
import InvalidData from '@/components/InvalidData';
import Orders from '@/components/admin/manage/Orders';
import Container from '@/components/container/Container';
import React from 'react';

const ManageOrdersPage = async () => {
  const orders = await getOrders();
  const currentUser = await getUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <InvalidData title='Access denied' />;
  }
  return (
    <div className='p-8'>
      <Container>
        <Orders orders={orders} />
      </Container>
    </div>
  );
};

export default ManageOrdersPage;
