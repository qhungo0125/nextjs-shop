'use client';

import { calculateRating } from '@/utils/calculate';
import { Rating } from '@mui/material';
import React, { use } from 'react';
import SplitLine from '../SplitLine';
import { CartProductType, SelectedImgType } from '@/types/CartProduct';
import ColorPicker from './ColorPicker';
import QuantityPicker from './QuantityPicker';
import Button from '../button/Button';
import ProductImages from './ProductImages';
import { useCart } from '@/hooks/useCart';
import { MdCheckCircle } from 'react-icons/md';
import { useRouter } from 'next/navigation';

interface Props {
  product: any;
}

const ProductDetail: React.FC<Props> = (props) => {
  const { product } = props;
  const router = useRouter();
  const { addToCart, products: cartProducts } = useCart();

  const {
    name,
    reviews,
    description,
    category,
    inStock,
    brand,
    id,
    images,
    price,
  } = product;

  const [isInCart, setIsInCart] = React.useState(false);
  const [cartProduct, setCartProduct] = React.useState<CartProductType>({
    id,
    name,
    description,
    category,
    brand,
    selectedImg: images[0],
    quantity: 1,
    price,
  });

  React.useEffect(() => {
    setIsInCart(false);
    if (cartProducts) {
      const isInCart = cartProducts?.findIndex((p: any) => p.id === product.id);
      if (isInCart > -1) {
        setIsInCart(true);
      }
    }
  }, [cartProducts, product.id]);

  const rating = React.useMemo(() => {
    return calculateRating(reviews);
  }, [reviews]);

  const onChangeColor = React.useCallback((value: SelectedImgType) => {
    setCartProduct((prev) => ({ ...prev, selectedImg: value }));
  }, []);

  const onDecreaseQty = React.useCallback(() => {
    if (cartProduct.quantity === 1) {
      return;
    }
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity - 1 }));
  }, [cartProduct.quantity]);
  const onIncreateQty = React.useCallback(() => {
    if (cartProduct.quantity === 5) {
      return;
    }
    setCartProduct((prev) => ({ ...prev, quantity: prev.quantity + 1 }));
  }, [cartProduct.quantity]);

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 gap-12'>
      <div>
        <ProductImages
          cartProduct={cartProduct}
          product={product}
          onColorSelect={onChangeColor}
        />
      </div>
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
        {!isInCart ? (
          <>
            <SplitLine />
            <div>
              <ColorPicker
                cartProduct={cartProduct}
                images={images}
                onChangeColor={onChangeColor}
              />
            </div>
            <SplitLine />
            <div>
              <QuantityPicker
                cartCounter={false}
                cartProduct={cartProduct}
                onDecrease={onDecreaseQty}
                onIncreate={onIncreateQty}
              />
            </div>
            <SplitLine />
            <div className='max-w-[300px]'>
              <Button
                label='Add to Cart'
                onclick={() => {
                  addToCart(cartProduct);
                }}
              />
            </div>
          </>
        ) : (
          <>
            <p className='mb-2 text-slate-500 flex items-center gap-1'>
              <MdCheckCircle className='text-teal-400' size={20} />
              <span>Product is added to cart</span>
            </p>
            <Button
              label='Go to Cart'
              onclick={() => {
                router.push('/cart');
              }}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
