import getProduct from '@/actions/getProduct';
import { getUser } from '@/actions/getUser';
import InvalidData from '@/components/InvalidData';
import Container from '@/components/container/Container';
import AddRating from '@/components/product/AddRating';
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
  const currentUser = await getUser();

  if (!product) {
    return <InvalidData title='No product' />;
  }

  return (
    <div className='p-8'>
      <Container>
        <ProductDetail product={product} />
        <div className='flex flex-col mt-20 gap-4'>
          <AddRating product={product} user={currentUser} />
          <Ratings product={product} />
        </div>
      </Container>
    </div>
  );
};

export default ProductPage;
