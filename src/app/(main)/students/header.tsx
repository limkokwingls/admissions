import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React from 'react';
import { Container } from '@/components/ui/container';
import Image from 'next/image';

type Props = {
  searchQuery: string;
};

export default function header({ searchQuery }: Props) {
  return (
    <Container className='flex gap-3 pt-8'>
      <Image
        src='/images/logo-dark.png'
        alt='Limkokwing University Logo'
        className='w-40'
        width={270}
        height={135}
        priority
      />
      <form action='/students' className='flex flex-col gap-3 sm:flex-row'>
        <div className='relative flex-grow'>
          <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-500 dark:text-neutral-400' />
          <Input
            name='q'
            defaultValue={searchQuery}
            placeholder='Enter your name or candidate number...'
            className='border-neutral-300 bg-white pl-10 dark:border-neutral-700 dark:bg-neutral-800'
          />
        </div>
        <Button type='submit'>Search</Button>
      </form>
    </Container>
  );
}
