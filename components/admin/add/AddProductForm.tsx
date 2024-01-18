'use client';
import Heading from '@/components/Heading';
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import { categories } from '@/data/categories';
import { SafeUser } from '@/types';
import React from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import CategoryItem from '../CategoryItem';
import { colors } from '@/data/colors';
import SelectColor from '@/components/form/SelectColor';

interface Props {
  currentUser: SafeUser | null;
}

export type ImageType = {
  color: string;
  colorCode: string;
  image: File | null;
};

export type UploadImageType = {
  color: string;
  colorCode: string;
  image: string | null;
};

const AddProductForm: React.FC<Props> = (props) => {
  const { currentUser } = props;
  const [isLoading, setIsLoading] = React.useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      id: '',
      name: '',
      description: '',
      price: 0,
      brand: '',
      category: '',
      inStock: true,
      images: [],
      reviews: [],
    },
  });

  const category = watch('category');
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  return (
    <>
      <Heading title='Add new product' center />
      <Input
        id='name'
        label='Name'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id='price'
        label='Price'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        type='number'
      />
      <Input
        id='brand'
        label='Brand'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <TextArea
        id='description'
        label='Description'
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Checkbox
        id='inStock'
        register={register}
        label='This product is in stock'
      />
      <div className='w-full font-medium'>
        <div className='mb-2 font-semibold'>select category</div>
        <div className='grid grid-cols-2 md:grid-cols-3 max-h-[50vh] overflow-y-auto gap-2'>
          {categories.map((item) => {
            if (item.label === 'all') return null;
            return (
              <div key={item.label} className=''>
                <CategoryItem
                  onClick={(c) => setCustomValue('category', c)}
                  selected={category === item.label}
                  label={item.label}
                  icon={item.icon}
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className='w-full flex flex-col flex-wrap gap-4'>
        <div>
          <div className='font-bold'>Select color and image</div>
          <div className='text-sm'>
            Need to upload the image with the selected color
          </div>
        </div>
        <div className='grid grid-cols-2 gap-3'>
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImage={() => {}}
                removeImage={() => {}}
                isProductCreated={false}
              />
            );
          })}
        </div>
      </div>
    </>
  );
};

export default AddProductForm;
