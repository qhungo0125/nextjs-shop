'use client';
import { SafeUser } from '@/types';
import { Order, Product, Review } from '@prisma/client';
import { useRouter } from 'next/navigation';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import Heading from '../Heading';
import { Rating } from '@mui/material';
import Input from '../form/Input';
import Button from '../button/Button';
import toast from 'react-hot-toast';
import axios from 'axios';

interface Props {
  product: Product & {
    reviews: Review[];
  };
  user:
    | (SafeUser & {
        orders: Order[];
      })
    | null;
}

const AddRating: React.FC<Props> = (props) => {
  const { product, user } = props;
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      comment: '',
      rating: 0,
    },
  });

  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    setIsLoading(true);
    if (data.rating === 0) {
      setIsLoading(false);
      return toast.error('Please select a rating');
    }
    const ratingData = {
      ...data,
      userId: user?.id,
      product: product,
    };

    axios
      .post('/api/rating', ratingData)
      .then(() => {
        toast.success('Rating added successfully');
        reset();
        router.refresh();
      })
      .catch((err) => {
        toast.error('Error adding rating');
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  if (!user || !product) return null;

  // const deliveredOrder = user.orders.some(
  //   (order) =>
  //     order.products.find((item) => item.id === product.id) &&
  //     order.status === 'delivered',
  // );

  // const userReview = product?.reviews.find(
  //   (review: Review) => review.userId === user.id,
  // );

  // if (userReview || !deliveredOrder) {
  //   return null;
  // }

  return (
    <div className='flex flex-col gap-2 max-w-[500px]'>
      <Heading title='Add a rating' />
      <div>
        <Rating
          onChange={(e, newValue) => {
            console.log('change', newValue);
            setCustomValue('rating', newValue);
          }}
        />
      </div>

      <Input
        id='comment'
        label='Comment'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Button
        onclick={handleSubmit(onSubmit)}
        label={isLoading ? 'Loading...' : 'Submit'}
      />
    </div>
  );
};

export default AddRating;
