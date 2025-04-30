'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Loader2, Search } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SearchForm() {
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const router = useRouter();
  
  const handleSearch = () => {
    if (!search.trim()) return;
    
    setIsSearching(true);
    router.push(`/students?q=${encodeURIComponent(search.trim())}`);
  };

  return (
    <div className='w-full max-w-xl mx-auto'>
      <div className='relative'>
        <Input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          disabled={isSearching}
          placeholder='Search by name or phone number'
          className='pr-12 h-12 text-base rounded-full border-2 focus-visible:ring-offset-2 shadow-sm'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSearch();
            }
          }}
        />
        <Button
          className='absolute right-1 top-1 h-10 w-10 rounded-full'
          size='icon'
          aria-label='Search'
          disabled={isSearching}
          onClick={handleSearch}
        >
          {isSearching ? (
            <Loader2 className='size-5 animate-spin' />
          ) : (
            <Search className='size-5' />
          )}
        </Button>
      </div>
    </div>
  );
}
