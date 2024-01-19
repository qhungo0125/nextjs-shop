'use client';
import React from 'react';
import { useDropzone } from 'react-dropzone';
import { ImageType } from '../admin/add/AddProductForm';

interface Props {
  item?: ImageType;
  handleFileChange: (value: File) => void;
}

const SelectImg: React.FC<Props> = (props) => {
  const { item, handleFileChange } = props;

  const onDrop = React.useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      handleFileChange(acceptedFiles[0]);
    }
    // Do something with the files
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.gif', '.jpeg', '.jpg'],
    },
  });

  return (
    <div
      {...getRootProps()}
      className='border-2 border-slate-400 p-2 border-dashed
    cursor-pointer text-sm font-normal text-slate-400 flex items-center justify-center
    '
    >
      <input {...getInputProps()} />
      {isDragActive ? <p>Drop file here</p> : <p>+ {item?.color} Iamge</p>}
    </div>
  );
};

export default SelectImg;
