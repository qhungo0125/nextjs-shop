import React from 'react';
import { IconType } from 'react-icons';

interface Props {
  text: string;
  icon: IconType;
  bg: string;
  color: string;
}

const Status: React.FC<Props> = (props) => {
  const { text, icon: Icon, bg, color } = props;
  return (
    <div className={`${bg} ${color} px-1 rounded flex items-center gap-1`}>
      {text}
      <Icon size={15} />
    </div>
  );
};

export default Status;
