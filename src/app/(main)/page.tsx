import React from 'react';
import SearchForm from './home/SearchForm';
import Image from 'next/image';
import Link from 'next/link';

export default function Page() {
  return (
    <div className='flex min-h-[80vh] flex-col items-center justify-center px-4 py-12'>
      <div className='mb-12 text-center'>
        <Link href='/' className='mb-6 flex items-center justify-center'>
          <Image
            src='/images/logo-dark.png'
            alt='Limkokwing University Logo'
            width={270}
            height={135}
            priority
          />
        </Link>
        <h2 className='mb-2 text-3xl font-extralight sm:text-4xl'>
          2025 Student Admissions
        </h2>
        <p className='mx-auto max-w-md text-sm text-background/50'>
          Enter your full names or phone number to find your admission details
        </p>
      </div>

      <div className='w-full max-w-2xl'>
        <SearchForm />
      </div>
    </div>
  );
}
