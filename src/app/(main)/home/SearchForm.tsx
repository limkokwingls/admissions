import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

type Props = {
  searchQuery?: string;
};

export default function SearchForm({ searchQuery }: Props) {
  return (
    <form action='/students' className='mx-auto w-full'>
      <div className='relative'>
        <Input
          type='text'
          name='q'
          defaultValue={searchQuery}
          placeholder='Search by name or phone number'
          className='h-12 rounded-full border-2 pr-12 text-base shadow-sm focus-visible:ring-offset-2'
        />
        <Button
          className='absolute right-1 top-1 h-10 w-10 rounded-full'
          size='icon'
          aria-label='Search'
        >
          <Search className='size-5' />
        </Button>
      </div>
    </form>
  );
}
