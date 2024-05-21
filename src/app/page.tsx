import { Button, Input } from '@nextui-org/react';
import Image from 'next/image';

export default function Home() {
  return (
    <main className='flex flex-col items-center'>
      <div className='flex gap-3'>
        <Input
          type='text'
          placeholder='Your names'
          variant='bordered'
          className='sm:w-72'
        />
        <Button color='primary'>Lookup</Button>
      </div>
    </main>
  );
}
