'use client';
import React from 'react';
import UserAvatar from '../product/UserAvatar';
import { AiFillCaretDown } from 'react-icons/ai';
import Link from 'next/link';
import { MenuItem } from '@mui/material';
import { signOut } from 'next-auth/react';
import BackDrop from './BackDrop';
import { SafeUser } from '@/types';

interface Props {
  currentUser: SafeUser | null;
}

const UserMenu: React.FC<Props> = (props) => {
  const { currentUser } = props;
  const [open, setOpen] = React.useState(false);
  const toggleMenu = () => {
    setOpen((pre) => !pre);
  };
  return (
    <>
      <div className='relative z-30'>
        <div
          onClick={() => toggleMenu()}
          className='p-2 border-[1px] border-slate-400 flex flex-row
        items-center gap-1 rounded-full cursor-pointer hover:shadow-md transition text-slate-700
        '
        >
          <UserAvatar />
          <AiFillCaretDown />
        </div>
        {open && (
          <div className='absolute rounded-md shadow-md w-[170px] bg-white overflow-hidden right-0 top-12 text-sm flex flex-col cursor-pointer'>
            {currentUser ? (
              <div>
                <Link href={'/cart'}>
                  <MenuItem onClick={() => toggleMenu()}>Your order</MenuItem>
                </Link>
                <Link href={'/admin'}>
                  <MenuItem onClick={() => toggleMenu()}>
                    Admin Dashboard
                  </MenuItem>
                </Link>
                <hr />
                <MenuItem
                  onClick={() => {
                    toggleMenu();
                    signOut();
                  }}
                >
                  Log out
                </MenuItem>
              </div>
            ) : (
              <div>
                <Link href={'/login'}>
                  <MenuItem onClick={() => toggleMenu()}>Log in</MenuItem>
                </Link>
                <Link href={'/register'}>
                  <MenuItem onClick={() => toggleMenu()}>Register</MenuItem>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
      {open && <BackDrop onClick={() => toggleMenu()} />}
    </>
  );
};

export default UserMenu;
