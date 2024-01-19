import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  icon: IconType;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
}

const ActionBtn: React.FC<Props> = (props) => {
  const { icon: Icon, onClick, disabled } = props;
  return (
    <button
      className={`flex items-center justify-center rounded cursor-pointer w-[40px] h-[30px] text-slate-700 border border-slate-400
  ${
    disabled
      ? 'opacity-50 cursor-not-allowed'
      : 'hover:bg-slate-100 hover:border-slate-500'
  }
  `}
    >
      <Icon size={18} />
    </button>
  );
};

export default ActionBtn;
