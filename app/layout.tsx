import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { HomeMeta } from '@/Meta/home';

const inter = Inter({ subsets: ['latin'] });
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
      <body className={inter.className}>{children}</body>
    </html>
  );
}
