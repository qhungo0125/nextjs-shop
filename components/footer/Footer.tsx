import React from 'react';
import Container from '../container/Container';
import FooterList from './FooterList';
import { CopyConstants } from '@/constants/Copy';
import Link from 'next/link';
import { MdFacebook } from 'react-icons/md';
import {
  AiFillInstagram,
  AiFillTwitterCircle,
  AiFillYoutube,
} from 'react-icons/ai';

const Footer = () => {
  return (
    <footer className='bg-slate-700 text-slate-200 text-sm mt-16'>
      <Container>
        <div className='flex flex-col md:flex-row justify-between pt-16 pb-8'>
          <FooterList>
            <h3 className='font-bold'>{CopyConstants.shopCategories.name}</h3>
            {CopyConstants.shopCategories.items.map((item) => (
              <Link key={`${item}`} href={`/${item}`}>
                {item}
              </Link>
            ))}
          </FooterList>

          <FooterList>
            <h3 className='font-bold'>{CopyConstants.customerServices.name}</h3>
            {CopyConstants.customerServices.items.map((item) => (
              <Link key={`${item}`} href={`/${item}`}>
                {item}
              </Link>
            ))}
          </FooterList>
          <FooterList>
            <h3 className='font-bold'>{CopyConstants.aboutUs.name}</h3>
            {CopyConstants.aboutUs.items.map((item) => (
              <Link key={`${item}`} href={`/${item}`}>
                {item}
              </Link>
            ))}
          </FooterList>
          <FooterList>
            <h3 className='font-bold'>FollowUs</h3>
            <div className='flex gap-2'>
              <Link href={'#'}>
                <MdFacebook size={24} />
              </Link>
              <Link href={'#'}>
                <AiFillTwitterCircle size={24} />
              </Link>
              <Link href={'#'}>
                <AiFillInstagram size={24} />
              </Link>
              <Link href={'#'}>
                <AiFillYoutube size={24} />
              </Link>
            </div>
          </FooterList>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
