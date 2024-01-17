import Container from '@/components/container/Container';
import ProductDetail from '@/components/product/ProductDetail';
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

  console.log(productId);

  return (
    <div>
      <Container>
        <ProductDetail product={products[1]} />
      </Container>
    </div>
  );
};

export default ProductPage;
