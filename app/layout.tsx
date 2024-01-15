import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { HomeMeta } from '@/meta/Home';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });
const { title, description } = HomeMeta;

export const metadata: Metadata = {
  title: title,
  description: description,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={poppins.className}>{children}</body>
    </html>
  );
}
