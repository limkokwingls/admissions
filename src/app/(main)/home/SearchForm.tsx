'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader, Loader2, Search } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useState } from 'react';
import { searchStudent } from '@/server/students/actions';

export default function SearchForm() {
  const [search, setSearch] = useState('');
  const { isPending, mutate } = useMutation({
    mutationFn: () => searchStudent(search),
  });

  return (
    <div className='w-full max-w-xl mx-auto'>
      <div className='relative'>
        <Input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isPending}
          placeholder='Search by name or phone number'
          className='pr-12 h-12 text-base rounded-full border-2 focus-visible:ring-offset-2 shadow-sm'
        />
        <Button
          className='absolute right-1 top-1 h-10 w-10 rounded-full'
          size='icon'
          aria-label='Search'
          disabled={isPending}
          onClick={() => mutate()}
        >
          {isPending ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <Search className='size-5' />
          )}
        </Button>
      </div>
    </div>
  );
}
