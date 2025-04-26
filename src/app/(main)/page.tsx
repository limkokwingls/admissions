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
            width={180}
            height={90}
            priority
          />
        </div>
        <h2 className='text-2xl font-semibold mb-2'>
          Student Admissions Portal
        </h2>
        <p className='text-lg max-w-md mx-auto'>
          Enter a student's name or phone number to search for their admission
          details
        </p>
      </div>

      <div className='w-full max-w-2xl'>
        <SearchForm />
      </div>

      <div className='mt-16 text-center'>
        <p className='text-sm'>
          For assistance, please contact the admissions office
        </p>
      </div>
    </div>
  );
}
