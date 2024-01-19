'use client';
import { Order, Product, User } from '@prisma/client';
import React from 'react';

interface Props {
  products: Product[];
  orders: Order[];
  users: User[];
}

const Summary: React.FC<Props> = (props) => {
  const { products, orders, users } = props;
  return <div>Summary</div>;
};

export default Summary;
