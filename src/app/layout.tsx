import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Link from 'next/link';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Limkokwing Admissions',
  description:
    'List of students who have been admitted to Limkokwing University',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='dark'>
      <body className={inter.className}>
        <Providers>
          <header className='flex flex-col items-center'>
            <Link href='/'>
              <Image alt='Logo' src='/logo.png' width={280} height={125} />
              <h1 className='text-center text-lg'>Student Admissions</h1>
            </Link>
          </header>
          <div className='mt-10'>{children}</div>
        </Providers>
      </body>
    </html>
  );
}
