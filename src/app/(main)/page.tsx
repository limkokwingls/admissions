import React from 'react';
import SearchForm from './home/SearchForm';
import Image from 'next/image';

export default function Page() {
  return (
    <div className='flex flex-col items-center justify-center min-h-[80vh] px-4 py-12'>
      <div className='text-center mb-12'>
        <div className='flex items-center justify-center mb-6'>
          <Image
            src='/images/logo-dark.png'
            alt='Limkokwing University Logo'
            width={270}
            height={135}
            priority
          />
        </div>
        <h2 className='text-3xl sm:text-4xl font-extralight mb-2'>
          2025 Student Admissions
        </h2>
        <p className='text-sm max-w-md mx-auto text-background/50'>
          Enter your full names or phone number to find your admission details
        </p>
      </div>

      <div className='w-full max-w-2xl'>
        <SearchForm />
      </div>
    </div>
  );
}
