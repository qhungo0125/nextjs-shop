import Image from 'next/image';
import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

interface Props {
  src?: string | null | undefined;
}

const UserAvatar: React.FC<Props> = (props) => {
  const { src } = props;

  if (!src) {
    return <FaUserCircle size={24} />;
  }

  return (
    <Image
      src={src}
      alt='user avatar'
      className='rounded-full'
      width={30}
      height={30}
    />
  );
};

export default UserAvatar;
