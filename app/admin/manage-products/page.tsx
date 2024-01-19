import getProducts from '@/actions/getProducts';
import { getUser } from '@/actions/getUser';
import InvalidData from '@/components/InvalidData';
import Products from '@/components/admin/manage/Products';
import Container from '@/components/container/Container';
import React from 'react';

const ManageProductsPage = async () => {
  const products = await getProducts({ category: null });
  const currentUser = await getUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <InvalidData title='Access denied' />;
  }
  return (
    <div className='p-8'>
      <Container>
        <Products products={products} />
      </Container>
    </div>
  );
};

export default ManageProductsPage;
