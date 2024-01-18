'use client';
import React from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';

interface Props {
  id: string;
  label: string;
  disabled?: boolean;
  register: UseFormRegister<FieldValues>;
}

const Checkbox: React.FC<Props> = (props) => {
  const { id, label, disabled, register } = props;
  return (
    <div className='w-full flex flex-row gap-2 items-center'>
      <input
        id={id}
        disabled={disabled}
        {...register(id)}
        placeholder=''
        type='checkbox'
        className='cursor-pointer'
      />
      <label htmlFor={id} className='font-medium cursor-pointer'>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
