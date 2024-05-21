import { Button, Input } from '@nextui-org/react';
import { MdArrowRight, MdSearch } from 'react-icons/md';

export default function Home() {
  return (
    <main>
      <div className='flex w-full flex-col sm:justify-center sm:flex-row gap-3'>
        <Input
          type='text'
          placeholder='Your names'
          variant='bordered'
          className='sm:w-96'
          startContent={<MdSearch className='text-xl' />}
        />
        <Button color='primary'>Lookup</Button>
      </div>
      <section className='mt-10 flex sm:justify-center flex-col sm:flex-row gap-3 sm:gap-8 w-full'>
        <Button
          variant='flat'
          className='py-6 px-10'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Diploma Programs
        </Button>
        <Button
          variant='flat'
          className='py-6 px-10'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Diploma Programs
        </Button>
      </section>
    </main>
  );
}
