'use client';
import { Button, Input } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { MdPerson, MdSearch } from 'react-icons/md';

export default function LookupField() {
  const [names, setNames] = React.useState('');
  const router = useRouter();

  function handleLookup() {
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
        startContent={<MdSearch className='text-xl' />}
        onClick={handleLookup}
      >
        Lookup
      </Button>
    </div>
  );
}
