'use client';
import Heading from '@/components/Heading';
import { numberFormatter, priceFormatter } from '@/utils/text';
import { Order, Product, User } from '@prisma/client';
import React from 'react';

interface Props {
  products: Product[];
  orders: Order[];
  users: User[];
}

type SummaryData = {
  [key: string]: {
    label: string;
    digit: number;
  };
};

const Summary: React.FC<Props> = (props) => {
  const { products, orders, users } = props;

  const [summaryData, setSummaryData] = React.useState<SummaryData>({
    sale: {
      label: 'Total Sales',
      digit: 0,
    },
    products: {
      label: 'Total Products',
      digit: 0,
    },
    orders: {
      label: 'Total Orders',
      digit: 0,
    },
    paidOrder: {
      label: 'Paid Orders',
      digit: 0,
    },
    unpaidOrder: {
      label: 'Unpaid Orders',
      digit: 0,
    },
    users: {
      label: 'Total Users',
      digit: 0,
    },
  });

  React.useEffect(() => {
    setSummaryData((prev) => {
      let temp = { ...prev };

      const totalSale = orders.reduce((acc, curr) => {
        if (curr.status === 'completed') {
          console.log(curr.status, curr.amount);

          return acc + curr.amount;
        }
        return acc;
      }, 0);
      console.log('totalSale', totalSale);

      const paidOrders = orders.filter((o) => o.status === 'completed');
      const unpaidOrders = orders.filter((o) => o.status === 'pending');

      temp.sale.digit = totalSale;
      temp.orders.digit = orders.length;
      temp.unpaidOrder.digit = unpaidOrders.length;
      temp.paidOrder.digit = paidOrders.length;
      temp.products.digit = products.length;
      temp.users.digit = users.length;

      return temp;
    });
  }, [orders, users, products]);

  const keys = Object.keys(summaryData);

  return (
    <div className='max-w-[1150px] m-auto'>
      <div className='mb-4 mt-8'>
        <Heading title='Summary ' center />
      </div>
      <div className='grid grid-cols-2 gap-3 max-h-50vh overflow-y-auto'>
        {keys &&
          keys.map((item) => {
            return (
              <div
                key={item}
                className='rounded-xl border-2 p-4 flex flex-col items-center gap-2 transition'
              >
                <div className='text-xl md:text-4xl font-bold'>
                  {summaryData[item].label === 'Total Sales' ? (
                    <>{priceFormatter(summaryData[item].digit)}</>
                  ) : (
                    <>{numberFormatter(summaryData[item].digit)}</>
                  )}
                </div>
                <div>{summaryData[item].label}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Summary;
