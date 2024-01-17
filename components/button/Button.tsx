'use client';
import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  label: string;
  disabled?: boolean;
  outLine?: boolean;
  small?: boolean;
  custom?: string;
  icon?: IconType;
  onclick?: () => void;
}

const Button: React.FC<Props> = (props) => {
  const {
    label,
    disabled,
    outLine,
    small,
    icon: Icon,
    onclick,
    custom,
  } = props;
  return (
    <button
      onClick={onclick}
      disabled={disabled}
      className={`
    disbabled:opacity-70
    disabled:cursor-not-allowed
    rounded-md
    hover:opacity-80
    transition
    w-full
    border-slate-700
    flex
    items-center
    justify-center
    gap-2
    ${outLine ? 'bg-white text-slate-700' : 'bg-slate-700 text-white'}
    ${
      small
        ? 'text-sm font-light py-1 px-2 border-[1px]'
        : 'text-md font-semibold py-3 px-4 border-2'
    }
    ${custom ? custom : ''}
    `}
    >
      {Icon && <Icon />}
      {label}
    </button>
  );
};

export default Button;
