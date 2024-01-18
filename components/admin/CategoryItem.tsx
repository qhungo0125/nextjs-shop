'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  selected?: boolean;
  label: string;
  icon: IconType;
  onClick: (value: String) => void;
}

const CategoryItem: React.FC<Props> = (props) => {
  const { selected, label, icon: Icon, onClick } = props;
  return (
    <div
      onClick={() => onClick(label)}
      className={`rounded-xl border-2 p-2 flex flex-col items-center gap-2 hover:border-slate-500 transition cursor-pointer
      ${selected ? 'border-slate-500' : 'border-slate-200'}
      `}
    >
      <Icon size={30} />
      <div className='font-medium'>{label}</div>
    </div>
  );
};

export default CategoryItem;
