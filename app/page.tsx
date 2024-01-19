export const revalidate = 0;

import getProducts, { ProductParams } from '@/actions/getProducts';
import InvalidData from '@/components/InvalidData';
import Container from '@/components/container/Container';
import Banner from '@/components/homebanner/Banner';
import ProductCard from '@/components/product/ProductCard';
import React from 'react';

interface Props {
  searchParams: ProductParams;
}

const Home: React.FC<Props> = async (props) => {
  const { searchParams } = props;
  const products = await getProducts(searchParams);

  if (products.length === 0) {
    return <InvalidData title='No products' />;
  }

  return (
    <div className='p-8'>
      <Container>
        <div>
          <Banner />
        </div>
        <div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8'>
          {products.map((product) => (
            <ProductCard key={product.name} product={product} />
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Home;
