'use client';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdPerson, MdSearch } from 'react-icons/md';
import { twMerge } from 'tailwind-merge';

export default function LookupField() {
  const [names, setNames] = React.useState('');
  const [loading, setLoading] = React.useState(false);
  const router = useRouter();

  function handleLookup() {
    setLoading(true);
    if (names.trim()) {
      router.push(`/search/${encodeURIComponent(names)}`);
    }
  }

  return (
    <div className='flex w-full flex-col sm:justify-center sm:items-center sm:flex-row gap-3'>
      <Input
        type='text'
        placeholder='Your names'
        variant='bordered'
        className='sm:w-96'
        size='lg'
        value={names}
        onChange={(e) => setNames(e.target.value)}
        startContent={<MdPerson className='text-lg' />}
      />
      <Button
        color='primary'
        variant='shadow'
        size='lg'
        isDisabled={!names.trim()}
        isLoading={loading}
        onClick={handleLookup}
      >
        Search
      </Button>
    </div>
  );
}
