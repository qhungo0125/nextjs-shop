'use client';
import { CartProductType, SelectedImgType } from '@/types/CartProduct';
import React from 'react';

interface Props {
  images: SelectedImgType[];
  cartProduct: CartProductType;
  onChangeColor: (value: SelectedImgType) => void;
}

const ColorPicker: React.FC<Props> = (props) => {
  const { images, cartProduct, onChangeColor = () => {} } = props;
  return (
    <div className='flex gap-4 items-center'>
      <div className='font-semibold'>COLOR: </div>
      <div className='flex gap-2'>
        {images.map((image) => {
          const { colorCode } = image;
          const selected = colorCode === cartProduct.selectedImg.colorCode;
          return (
            <div
              key={colorCode}
              className={`w-8 h-8 rounded-full border-2 ${
                selected ? 'border-teal-300' : 'border-none'
              }
              flex items-center justify-center
              `}
              onClick={() => onChangeColor(image)}
            >
              <div
                className={`w-6 h-6 rounded-full cursor-pointer `}
                style={{ backgroundColor: colorCode }}
              ></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ColorPicker;
