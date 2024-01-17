'use client';
import { CartProductType } from '@/types/CartProduct';
import React from 'react';

interface Props {
  cartCounter: boolean;
  cartProduct: CartProductType;
  onIncreate: () => void;
  onDecrease: () => void;
}

const btnStyle = 'border-[1.2px] border-slate-300 px-2 rounded';

const QuantityPicker: React.FC<Props> = (props) => {
  const {
    cartCounter,
    cartProduct,
    onIncreate = () => {},
    onDecrease = () => {},
  } = props;
  const { quantity } = cartProduct;

  return (
    <div className='flex gap-8 items-center'>
      {cartCounter ? null : <div className='font-semibold'>QUANTITY: </div>}
      <div className='flex gap-4 items-center text-base'>
        <button className={btnStyle} onClick={onDecrease}>
          -
        </button>
        <div>{quantity}</div>
        <button className={btnStyle} onClick={onIncreate}>
          +
        </button>
      </div>
    </div>
  );
};

export default QuantityPicker;
