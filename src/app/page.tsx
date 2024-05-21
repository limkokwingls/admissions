import { Button, Input } from '@nextui-org/react';
import { MdSearch } from 'react-icons/md';

export default function Home() {
  return (
    <main className='flex flex-col items-center'>
      <div className='flex gap-3'>
        <Input
          type='text'
          placeholder='Your names'
          variant='bordered'
          className='sm:w-80'
          startContent={<MdSearch className='text-xl' />}
        />
        <Button color='primary'>Lookup</Button>
      </div>
    </main>
  );
}
