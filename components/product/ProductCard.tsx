import { priceFormatter } from '@/utils/text';
import { Rating } from '@mui/material';
import Image from 'next/image';
import React from 'react';

interface Props {
  product: any;
}

const ProductCard: React.FC<Props> = ({ product }) => {
  const rating = React.useMemo(() => {
    const total = product.reviews.reduce((acc: number, item: any) => {
      return acc + item.rating;
    }, 0);
    return total / product.reviews.length;
  }, [product.reviews]);

  return (
    <div className='col-span-1 cursor-pointer border-[1.2px] border-slate-200 bg-slate-50 rounded-sm p-2 transition hover:scale-105 text-center text-sm'>
      <div className='flex flex-col items-center w-full gap-1'>
        <div className='aspect-square overflow-hidden relative w-full'>
          <Image
            src={product.images[0].image}
            alt={product.name}
            fill
            className='object-contain'
          />
        </div>
        <div
          className='mt-4
          w-full
        '
        >
          <p className='whitespace-nowrap overflow-hidden overflow-ellipsis'>
            {product.name}
          </p>
          <Rating value={rating} readOnly />
          <div>{product.reviews.length} reviews</div>
          <div className='font-semibold'>{priceFormatter(product.price)}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
