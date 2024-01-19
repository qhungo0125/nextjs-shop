'use client';
import { Order } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import Heading from '../Heading';
import { priceFormatter } from '@/utils/text';
import Status from '../admin/Status';
import { MdAccessTimeFilled, MdDeliveryDining, MdDone } from 'react-icons/md';
import InvalidData from '../InvalidData';
import moment from 'moment';
import OrderItem from './OrderItem';

interface Props {
  order: Order | null;
}

const OrderDetail: React.FC<Props> = (props) => {
  const { order } = props;
  const router = useRouter();

  if (!order) return <InvalidData title='No Order' />;

  const {
    id,
    amount,
    createDateTime,
    products,
    status: paymentStatus,
    deliveryStatus,
  } = order;
  return (
    <div className='max-w-[1150px] m-auto flex flex-col gap-2'>
      <div className='mt-8'>
        <Heading title='Order Details' />
      </div>
      <div>Order ID: {id}</div>
      <div>
        Total amount:
        <span className='font-bold'>{priceFormatter(amount)}</span>
      </div>
      <div className='flex gap-2 items-center'>
        Payment Status:
        {paymentStatus === 'pending' ? (
          <Status
            text='Pending'
            icon={MdAccessTimeFilled}
            bg='bg-slate-200'
            color='text-slate-800'
          />
        ) : paymentStatus === 'dispatched' ? (
          <Status
            text='dispatched'
            icon={MdDeliveryDining}
            bg='bg-purple-200'
            color='text-purple-800'
          />
        ) : paymentStatus === 'completed' ? (
          <Status
            text='completed'
            icon={MdDone}
            bg='bg-teal-200'
            color='text-teal-800'
          />
        ) : (
          <></>
        )}
      </div>

      <div className='flex gap-2 items-center'>
        Delivery Status:
        {deliveryStatus === 'pending' ? (
          <Status
            text='Pending'
            icon={MdAccessTimeFilled}
            bg='bg-slate-200'
            color='text-slate-800'
          />
        ) : deliveryStatus === 'dispatched' ? (
          <Status
            text='dispatched'
            icon={MdDeliveryDining}
            bg='bg-purple-200'
            color='text-purple-800'
          />
        ) : deliveryStatus === 'delivered' ? (
          <Status
            text='delivered'
            icon={MdDone}
            bg='bg-teal-200'
            color='text-teal-800'
          />
        ) : (
          <></>
        )}
      </div>
      <div>Date: {moment(createDateTime).fromNow()}</div>
      <div>
        <h2 className='font-semibold mt-4 mb-2'>Ordered Products </h2>
        <div className='grid grid-cols-5 text-xs gap-4 pb-2 items-center'>
          <div className='col-span-2 justify-self-start'>PRODUCT</div>
          <div className='justify-self-center'>PRICE</div>
          <div className='justify-self-center'>QTY</div>
          <div className='justify-self-end'>TOTAL</div>
        </div>

        {products &&
          products.map((product) => {
            return (
              <>
                <OrderItem key={product.id} item={product} />
              </>
            );
          })}
      </div>
    </div>
  );
};

export default OrderDetail;
