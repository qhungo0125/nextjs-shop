import CheckoutDetail from '@/components/checkout/CheckoutDetail';
import Container from '@/components/container/Container';
import FormWrap from '@/components/form/FormWrap';
import React from 'react';

const CheckoutPage = () => {
  return (
    <div className='p-8'>
      <Container>
        <FormWrap>
          <CheckoutDetail />
        </FormWrap>
      </Container>
    </div>
  );
};

export default CheckoutPage;
