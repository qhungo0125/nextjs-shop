import { getUser } from '@/actions/getUser';
import InvalidData from '@/components/InvalidData';
import AddProductForm from '@/components/admin/add/AddProductForm';
import Container from '@/components/container/Container';
import FormWrap from '@/components/form/FormWrap';
import React from 'react';

const AddProductPage = async () => {
  const currentUser = await getUser();
  if (!currentUser || currentUser.role !== 'ADMIN') {
    return <InvalidData title='Access denied' />;
  }
  return (
    <div className='p-8'>
      <Container>
        <FormWrap>
          <AddProductForm currentUser={currentUser} />
        </FormWrap>
      </Container>
    </div>
  );
};

export default AddProductPage;
