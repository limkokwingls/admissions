import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { MdArrowRight, MdPerson, MdSearch } from 'react-icons/md';

export default function Home() {
  return (
    <main>
      <div className='flex w-full flex-col sm:justify-center sm:flex-row gap-3'>
        <Input
          type='text'
          placeholder='Your names'
          variant='bordered'
          className='sm:w-96'
          startContent={<MdPerson className='text-lg' />}
        />
        <Button color='primary' startContent={<MdSearch className='text-xl' />}>
          Lookup
        </Button>
      </div>
      <section className='mt-10 flex sm:justify-center flex-col sm:flex-row gap-3 sm:gap-8 w-full'>
        <Button
          variant='flat'
          as={Link}
          href='/programs/degree'
          className='py-6 px-10'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Diploma Programs
        </Button>
        <Button
          variant='flat'
          as={Link}
          href='/programs/diploma'
          className='py-6 px-10'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Diploma Programs
        </Button>
      </section>
    </main>
  );
}
