import React from 'react';
import Container from '../container/Container';
import Link from 'next/link';
import CartCount from './CartCount';
import UserMenu from './UserMenu';
import { getUser } from '@/actions/getUser';

const NavBar = async () => {
  const currentUser = await getUser();

  return (
    <div className='sticky top-0 w-full bg-slate-200 z-30 shadow-sm'>
      <div className='py-4 border-b-[1px]'>
        <Container>
          <div className='flex items-center justify-between gap-3 md:gap-0'>
            <Link href='/'>Home</Link>
            <div className='hidden md:block'>Search</div>
            <div className='flex items-center gap-8 md:gap-12'>
              <CartCount />
              <UserMenu currentUser={currentUser} />
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
};

export default NavBar;
