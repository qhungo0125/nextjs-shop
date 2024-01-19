import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  selected: boolean;
  icon: IconType;
  label: string;
}

const NavItem: React.FC<Props> = (props) => {
  const { selected, icon: Icon, label } = props;
  return (
    <div
      className={`flex items-center justify-center text-center gap-1 p-2 
  border-b-2 hover:text-slate-800 transiton cursor-pointer ${
    selected ? 'border-b-slate-800' : 'border-transparent text-slate-500'
  }`}
    >
      <Icon size={20} />
      <div className='font-medium text-sm text-center break-normal'>
        {label}
      </div>
    </div>
  );
};

export default NavItem;
