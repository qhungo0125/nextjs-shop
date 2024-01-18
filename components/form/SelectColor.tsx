import React from 'react';
import { ImageType } from '../admin/add/AddProductForm';
import SelectImg from './SelectImg';
import Button from '../button/Button';

interface Props {
  item: ImageType;
  addImage: (value: ImageType) => void;
  removeImage: (value: ImageType) => void;
  isProductCreated: boolean;
}

const SelectColor: React.FC<Props> = (props) => {
  const { item, addImage, removeImage, isProductCreated } = props;
  const [isSelected, setIsSelected] = React.useState(false);
  const [file, setFile] = React.useState<File | null>(null);

  React.useEffect(() => {
    if (isProductCreated) {
      setIsSelected(false);
      setFile(null);
    }
  }, [isProductCreated]);

  const handleFileChange = React.useCallback(
    (value: File) => {
      setFile(value);
      addImage({ ...item, image: value });
    },
    [item, addImage],
  );

  const handleCheck = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setIsSelected(!isSelected);
      if (!e.target.checked) {
        setFile(null);
        removeImage(item);
      }
    },
    [isSelected, item, removeImage],
  );

  return (
    <div className='grid grid-cols-1 overflow-y-auto border-b-[1.2px] border-slate-200 items-center p-2'>
      <div className='flex flex-grow gap-2 items-center h-[60px]'>
        <input
          id={item.color}
          type='checkbox'
          onChange={handleCheck}
          checked={isSelected}
          className='cursor-pointer'
        />
        <label htmlFor={item.color} className='font-medium cursor-pointer'>
          {item.color}
        </label>
      </div>
      <>
        {isSelected && !file && (
          <div className='col-span-2 text-center'>
            <SelectImg item={item} handleFileChange={handleFileChange} />
          </div>
        )}
        {file && (
          <div className='flex flex-row gap-2 text-sm col-span-2 items-center justify-between'>
            <p>{file?.name}</p>
            <div className='w-70px'>
              <Button
                label='Remove'
                onclick={() => {
                  setFile(null);
                  removeImage(item);
                }}
                small
              />
            </div>
          </div>
        )}
      </>
    </div>
  );
};

export default SelectColor;
