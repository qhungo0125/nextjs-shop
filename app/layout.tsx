import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';
import { HomeMeta } from '@/meta/Home';
import NavBar from '@/components/navigation/NavBar';
import Footer from '@/components/footer/Footer';
import CartProvider from '@/providers/CartProvider';

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
      <body className={`${poppins.className} text-slate-700`}>
        <CartProvider>
          <div className='flex flex-col min-h-screen'>
            <NavBar />
            <main className='flex-grow'>{children}</main>
            <Footer />
          </div>
        </CartProvider>
      </body>
    </html>
  );
}
