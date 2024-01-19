import getGraphData from '@/actions/getGraphData';
import getOrders from '@/actions/getOrders';
import getProducts from '@/actions/getProducts';
import getUsers from '@/actions/getUsers';
import BarGraph from '@/components/admin/summary/BarGraph';
import Summary from '@/components/admin/summary/Summary';
import Container from '@/components/container/Container';
import React from 'react';

const AdminPage = async () => {
  const products = await getProducts();
  const orders = await getOrders();
  const users = await getUsers();
  const graphData = await getGraphData();
  return (
    <div className='pt-8'>
      <Container>
        <Summary products={products} orders={orders} users={users} />
        <div className='mt-4 mx-auto max-w-[1150px]'>
          <BarGraph data={graphData} />
        </div>
      </Container>
    </div>
  );
};

export default AdminPage;
