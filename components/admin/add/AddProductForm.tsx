'use client';
import Heading from '@/components/Heading';
import Checkbox from '@/components/form/Checkbox';
import Input from '@/components/form/Input';
import TextArea from '@/components/form/TextArea';
import { categories } from '@/data/categories';
import { SafeUser } from '@/types';
import React from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import CategoryItem from '../CategoryItem';
import { colors } from '@/data/colors';
import SelectColor from '@/components/form/SelectColor';
import Button from '@/components/button/Button';
import toast from 'react-hot-toast';
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import firebaseApp from '@/libs/firebase';
import axios from 'axios';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);
  const [images, setImages] = React.useState<ImageType[]>([]);
  const [isProductCreated, setIsProductCreated] = React.useState(false);
  console.log('images>>>', images);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      name: '',
      description: '',
      price: 0,
      brand: '',
      category: '',
      inStock: true,
      images: [],
    },
  });

  const category = watch('category');
  const setCustomValue = React.useCallback(
    (id: string, value: any) => {
      setValue(id, value, {
        shouldValidate: true,
        shouldDirty: true,
        shouldTouch: true,
      });
    },
    [setValue],
  );

  React.useEffect(() => {
    setCustomValue('images', images);
  }, [images, setCustomValue]);

  React.useEffect(() => {
    if (isProductCreated) {
      reset();
      setImages([]);
      setIsProductCreated(false);
    }
  }, [isProductCreated, reset]);

  const addImage = React.useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [value];
      }
      return [...prev, value];
    });
  }, []);
  const removeImage = React.useCallback((value: ImageType) => {
    setImages((prev) => {
      if (!prev) {
        return [];
      }
      return prev.filter((item) => item.color !== value.color);
    });
  }, []);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log('data>>>', data);
    setIsLoading(true);
    let uploadedImages: UploadImageType[] = [];

    if (!data.category) {
      setIsLoading(false);
      toast.error('Please select a category');
      return;
    }

    if (!data.images || data.images.length === 0) {
      setIsLoading(false);
      toast.error('Please select at least one image');
      return;
    }

    const handleImageUpload = async () => {
      toast.loading('Uploading images...');
      try {
        for (const item of data.images) {
          if (item.image) {
            const fileName = new Date().getTime() + '-' + item.image.name;
            console.log('fileName>>>', fileName);
            console.log('fileName>>>', firebaseApp);

            const storage = getStorage(firebaseApp);
            const storageRef = ref(storage, `products/${fileName}`);
            const uploadTask = uploadBytesResumable(storageRef, item.image);
            await new Promise<void>((resolve, reject) => {
              uploadTask.on(
                'state_changed',
                (snapshot) => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                  }
                },
                (err) => {
                  console.log('err>>>', err);
                  reject(err);
                },
                () => {
                  getDownloadURL(uploadTask.snapshot.ref)
                    .then((downloadURL) => {
                      uploadedImages.push({
                        ...item,
                        image: downloadURL,
                      });
                      resolve();
                    })
                    .catch((err) => {
                      console.log('err>>>', err);
                      reject(err);
                    });
                },
              );
            });
          }
        }
      } catch (error) {
        setIsLoading(false);
        toast.error('Error uploading images');
      }
    };

    await handleImageUpload();
    const productData = {
      ...data,
      images: uploadedImages,
    };

    axios
      .post('/api/product', productData)
      .then(() => {
        toast.success('Product added successfully');
        setIsProductCreated(true);
        router.refresh();
      })
      .catch((err) => {
        toast.error('Error adding product');
        console.log('err>>>', err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    console.log('productData>>>', productData);
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
        <div className='grid grid-cols-1 gap-3'>
          {colors.map((item, index) => {
            return (
              <SelectColor
                key={index}
                item={item}
                addImage={addImage}
                removeImage={removeImage}
                isProductCreated={isProductCreated}
              />
            );
          })}
        </div>
      </div>
      <Button
        label={isLoading ? 'Loading...' : 'Add product'}
        onclick={handleSubmit(onSubmit)}
      />
    </>
  );
};

export default AddProductForm;
