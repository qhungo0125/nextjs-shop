'use client';
import Container from '@/components/container/Container';
import Link from 'next/link';
import React from 'react';
import NavItem from './NavItem';
import {
  MdDashboard,
  MdDns,
  MdFormatListBulleted,
  MdLibraryAdd,
} from 'react-icons/md';
import { usePathname } from 'next/navigation';

const AdminNav = () => {
  const pathname = usePathname();
  return (
    <div className='w-full shadow-sm top-20 border-b-[1px] pt-4'>
      <Container>
        <div className='flex flex-row items-center justify-between md:justify-center gap-8 md:gap-12 overflow-x-auto flex-nowrap '>
          <Link href={'/admin'}>
            <NavItem
              selected={pathname === '/admin'}
              icon={MdDashboard}
              label='summary'
            />
          </Link>
          <Link href={'/admin/add-product'}>
            <NavItem
              selected={pathname === '/admin/add-product'}
              icon={MdLibraryAdd}
              label='Add product'
            />
          </Link>
          <Link href={'/admin/manage-products'}>
            <NavItem
              selected={pathname === '/admin/manage-products'}
              icon={MdDns}
              label='Manage products'
            />
          </Link>
          <Link href={'/admin/manage-orders'}>
            <NavItem
              selected={pathname === '/admin/manage-orders'}
              icon={MdFormatListBulleted}
              label='Manage orders'
            />
          </Link>
        </div>
      </Container>
    </div>
  );
};

export default AdminNav;
