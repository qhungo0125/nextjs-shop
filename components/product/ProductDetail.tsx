import { calculateRating } from '@/utils/calculate';
import { Rating } from '@mui/material';
import React from 'react';
import SplitLine from '../SplitLine';

interface Props {
  product: any;
}

const ProductDetail: React.FC<Props> = (props) => {
  const { product } = props;
  const { reviews, description, category, inStock, brand } = product;

  const rating = React.useMemo(() => {
    return calculateRating(reviews);
  }, [reviews]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2'>
      <div>Image</div>
      <div className='flex flex-col gap-1 text-slate-500 text-sm'>
        <h2 className='text-3xl font-medium text-slate-700'>{product.name}</h2>
        <div className='flex items-center gap-2'>
          <Rating value={rating} readOnly />
          <div>{reviews.length} reviews</div>
        </div>
        <SplitLine />
        <div className='text-justify'>{description}</div>
        <div>
          <span className='font-semibold'>CATEGORY: </span>
          {category}
        </div>
        <div>
          <span className='font-semibold'>BRAND: </span>
          {brand}
        </div>
        <div className={inStock ? 'text-teal-400' : 'text-rose-400'}>
          {inStock ? 'In Stock' : 'Out of Stock'}
        </div>
        <SplitLine />
        <div>color</div>
        <SplitLine />
        <div>quantity</div>
        <SplitLine />
        <div>add to cart</div>
      </div>
    </div>
  );
};

export default ProductDetail;
