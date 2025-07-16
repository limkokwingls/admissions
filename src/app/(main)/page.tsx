import React from 'react';
import SearchForm from './home/SearchForm';
import Image from 'next/image';
import Link from 'next/link';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default async function Page() {
  const session = await auth();

  if (
    session?.user &&
    ['registry', 'admin'].includes(session?.user?.role || '')
  ) {
    redirect('/admin');
  }

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
          Search for your admission details below. If you've received an
          admission letter, you can proceed to registration.
        </p>
      </div>

      <div className='w-full max-w-2xl space-y-6'>
        <div className='text-center'>
          <Link href='/registration'>
            <Button className='w-full max-w-md rounded-2xl py-5'>
              Proceed to Registration <ArrowRight className='ml-2 size-4' />
            </Button>
          </Link>
        </div>
        <div className='flex items-center justify-center'>
          <div className='flex items-center space-x-4'>
            <div className='h-px flex-1 bg-neutral-200 dark:bg-neutral-800'></div>
            <span className='text-sm text-neutral-500 dark:text-neutral-400'>
              or
            </span>
            <div className='h-px flex-1 bg-neutral-200 dark:bg-neutral-800'></div>
          </div>
        </div>

        <SearchForm />
      </div>
    </div>
  );
}
