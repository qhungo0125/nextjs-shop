import { CartProductType } from '@/types/CartProduct';
import { priceFormatter } from '@/utils/text';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import QuantityPicker from '../product/QuantityPicker';
import { useCart } from '@/hooks/useCart';

interface Props {
  product: CartProductType;
}

const CartItem: React.FC<Props> = (props) => {
  const { product } = props;
  const { removeFromCart, decreaseQty, increaseQty } = useCart();
  const { name, price, quantity, selectedImg } = product;
  return (
    <div className='grid grid-cols-5 text-xs md:text-sm gap-4 border-[1.5px] border-slate-200 py-4 items-center'>
      <div className='col-span-2 justify-items-start flex gap-2 md:gap-4'>
        <Link href={`/products/${product.id}`}>
          <div className='relative w-[70px] aspect-square'>
            <Image
              src={selectedImg.image}
              fill
              alt={selectedImg.image}
              className='object-contain'
            />
          </div>
        </Link>
        <div className='flex flex-col justify-between'>
          <Link href={`/products/${product.id}`}>{name}</Link>
          <div>{selectedImg.color}</div>
          <div className='w-[70px]'>
            <button
              className='text-slate-500 underline'
              onClick={() => {
                removeFromCart(product);
              }}
            >
              remove
            </button>
          </div>
        </div>
      </div>
      <div className='justify-self-center'>{priceFormatter(price)}</div>
      <div className='justify-self-center'>
        <QuantityPicker
          cartCounter
          cartProduct={product}
          onDecrease={() => {
            decreaseQty(product);
          }}
          onIncreate={() => {
            increaseQty(product);
          }}
        />
      </div>
      <div className='justify-self-end font-semibold'>
        {priceFormatter(price * quantity)}
      </div>
    </div>
  );
};

export default CartItem;
