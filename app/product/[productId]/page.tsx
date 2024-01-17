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

  return <div>ProductPage</div>;
};

export default ProductPage;
