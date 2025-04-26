import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search } from 'lucide-react';

export default function SearchForm() {
  return (
    <div className="w-full max-w-xl mx-auto">
      <div className="relative">
        <Input
          type="text"
          placeholder="Search by name or phone number"
          className="pr-12 h-12 text-base rounded-full border-2 focus-visible:ring-offset-2 shadow-sm"
        />
        <Button 
          className="absolute right-1 top-1 h-10 w-10 rounded-full" 
          size="icon"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
