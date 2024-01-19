import getOrder from '@/actions/getOrder';
import Container from '@/components/container/Container';
import OrderDetail from '@/components/order/OrderDetail';
import React from 'react';
interface Props {
  params: {
    id: string;
  };
}

const OrderPage: React.FC<Props> = async (props) => {
  const { params } = props;
  const { id } = params;

  const order = await getOrder({ orderId: id });

  return (
    <div className='p-8'>
      <Container>
        <OrderDetail order={order} />
      </Container>
    </div>
  );
};

export default OrderPage;
