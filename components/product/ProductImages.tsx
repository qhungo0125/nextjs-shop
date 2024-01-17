import { CartProductType, SelectedImgType } from '@/types/CartProduct';
import Image from 'next/image';
import React, { MouseEventHandler } from 'react';

interface Props {
  cartProduct: CartProductType;
  product: any;
  onColorSelect: (value: SelectedImgType) => void;
}

const ProductImages: React.FC<Props> = (props) => {
  const { cartProduct, product, onColorSelect } = props;
  const { images } = product;
  return (
    <div className='grid grid-cols-6 gap-2 h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
      <div className='flex flex-col items-center justify-center gap-4 cursor-pointer border h-full max-h-[500px] min-h-[300px] sm:min-h-[400px]'>
        {images.map((img: SelectedImgType) => {
          return (
            <div
              key={img.color}
              onClick={() => onColorSelect(img)}
              className={`relative w-[80%] aspect-square rounded border-teal-300 ${
                cartProduct.selectedImg.color === img.color
                  ? 'border-[1.5px]'
                  : 'border-none'
              }`}
            >
              <Image
                src={img.image}
                alt={img.color}
                fill
                className='object-contain'
              />
            </div>
          );
        })}
      </div>
      <div className='col-span-5 relative aspect-square'>
        <Image
          src={cartProduct.selectedImg.image}
          alt={cartProduct.selectedImg.color}
          fill
          className='w-full h-full max-h-[500px] min-h-[300px] sm:min-h-[400px] object-contain'
        />
      </div>
    </div>
  );
};

export default ProductImages;
