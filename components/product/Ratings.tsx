'use client';

import React from 'react';
import Heading from '../Heading';
import moment from 'moment';
import { Rating } from '@mui/material';
import { calculateRating } from '@/utils/calculate';
import UserAvatar from './UserAvatar';
interface Props {
  product: any;
}

const ProductRatings: React.FC<Props> = (props) => {
  const { product } = props;
  const { reviews } = product;
  const rating = React.useMemo(() => {
    return calculateRating(reviews);
  }, [reviews]);

  if (product.reviews.length === 0) {
    return null;
  }

  return (
    <div>
      <Heading title='Product Review' />
      <div className='text-sm mt-2'>
        {product.reviews &&
          product.reviews.map((review: any) => {
            return (
              <div key={review.id} className='max-w-300px'>
                <div className='flex gap-2 items-center'>
                  <div>
                    <UserAvatar src={review.user.image} />
                  </div>
                  <div className='font-semibold'>{review?.user.name}</div>
                  <div className='font-light'>
                    {moment(review.createdDate).fromNow()}
                  </div>
                </div>
                <div className='mt-2'>
                  <Rating value={rating} />
                  <div className='mt-2'>{review.comment}</div>
                  <hr className='my-4' />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default ProductRatings;
