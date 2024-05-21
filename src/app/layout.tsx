import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Providers } from './providers';
import Link from 'next/link';
import Image from 'next/image';
import Container from './core/Container';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Limkokwing Admissions',
  description:
    'Student Admissions, Limkokwing University of Creative Technology Lesotho',
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
            <Link href='/' className='mt-5'>
              <Image alt='Logo' src='/logo.png' width={280} height={125} />
            </Link>
          </header>
          <Container className='mt-5 sm:mt-10'>{children}</Container>
        </Providers>
      </body>
    </html>
  );
}
