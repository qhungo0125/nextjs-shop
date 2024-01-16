import Container from '@/components/container/Container';
import Banner from '@/components/homebanner/Banner';
import ProductCard from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { truncate } from '@/utils/text';
import React from 'react';

const Home = () => {
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
