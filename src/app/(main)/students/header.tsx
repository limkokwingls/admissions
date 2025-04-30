import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';
import React from 'react';
import { Container } from '@/components/ui/container';
import Image from 'next/image';
import Link from 'next/link';
import SearchForm from '../home/SearchForm';

type Props = {
  searchQuery: string;
};

export default function header({ searchQuery }: Props) {
  return (
    <Container
      width='xl'
      className='flex flex-col items-center justify-between gap-5 pt-8 sm:flex-row'
    >
      <Link href={'/'}>
        <Image
          src='/images/logo-dark.png'
          alt='Limkokwing University Logo'
          className='w-40'
          width={270}
          height={135}
          priority
        />
      </Link>
      <SearchForm />
    </Container>
  );
}
