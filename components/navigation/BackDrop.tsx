import React from 'react';

interface Props {
  onClick?: () => void;
}

const BackDrop: React.FC<Props> = (props) => {
  const { onClick } = props;
  return (
    <div
      onClick={onClick}
      className='z-20 bg-slate-200 opacity-50 w-screen h-screen fixed top-0 left-0'
    ></div>
  );
};

export default BackDrop;
