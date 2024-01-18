import React from 'react';

interface Props {
  title: string;
}

const InvalidData: React.FC<Props> = (props) => {
  const { title } = props;
  return (
    <div className='w-full h-[50vh] flex items-center justify-center text-xl md:text-2xl'>
      <p className='font-medium'>{title}</p>
    </div>
  );
};

export default InvalidData;
