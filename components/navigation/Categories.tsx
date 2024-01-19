'use client';
import React from 'react';
import Container from '../container/Container';
import { categories } from '@/data/categories';
import CategoryItem from './CategoryItem';
import { usePathname, useSearchParams } from 'next/navigation';

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get('category');
  const pathname = usePathname();
  const isHome = pathname === '/';

  if (!isHome) {
    return null;
  }

  return (
    <div className='bg-white'>
      <Container>
        <div className='pt-4 flex flex-row items-center justify-between overflow-x-auto'>
          {categories.map((cate) => {
            return (
              <CategoryItem
                key={cate.label}
                label={cate.label}
                icon={cate.icon}
                selected={
                  category === cate.label ||
                  (category === null && cate.label === 'all')
                }
              />
            );
          })}
        </div>
      </Container>
    </div>
  );
};

export default Categories;
