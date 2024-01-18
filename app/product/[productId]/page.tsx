import Container from '@/components/container/Container';
import ProductDetail from '@/components/product/ProductDetail';
import Ratings from '@/components/product/Ratings';
import { products } from '@/data/products';
import React from 'react';
interface Props {
  params: {
    productId: string;
  };
}

const ProductPage: React.FC<Props> = (props) => {
  const { params } = props;
  const { productId } = params;

  return (
    <div className='p-8'>
      <Container>
        <ProductDetail product={products.find((p) => p.id === productId)} />
        <div className='flex flex-col mt-20 gap-4'>
          <div>Add rating</div>
          <div>List</div>
          <Ratings product={products.find((p) => p.id === productId)} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
