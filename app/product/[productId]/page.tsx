import getProduct from '@/actions/getProduct';
import InvalidData from '@/components/InvalidData';
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

const ProductPage: React.FC<Props> = async (props) => {
  const { params } = props;
  const { productId } = params;
  const product = await getProduct({ productId });

  if (!product) {
    return <InvalidData title='No product' />;
  }

  return (
    <div className='p-8'>
      <Container>
        <ProductDetail product={product} />
        <div className='flex flex-col mt-20 gap-4'>
          <Ratings product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
