import { Button, Input } from '@nextui-org/react';
import Link from 'next/link';
import { MdArrowRight, MdPerson, MdSearch } from 'react-icons/md';

export default function Home() {
  return (
    <main>
      <div className='flex w-full flex-col sm:justify-center sm:items-center sm:flex-row gap-3'>
        <Input
          type='text'
          placeholder='Your names'
          variant='bordered'
          className='sm:w-96'
          size='lg'
          startContent={<MdPerson className='text-lg' />}
        />
        <Button
          color='primary'
          variant='shadow'
          startContent={<MdSearch className='text-xl' />}
        >
          Lookup
        </Button>
      </div>
      <section className='mt-10 flex sm:justify-center flex-col sm:flex-row gap-3 sm:gap-8 w-full'>
        <Button
          className='py-8 sm:px-11'
          variant='faded'
          as={Link}
          href='/programs/degree'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Diploma Programs
        </Button>
        <Button
          className='py-8 sm:px-11'
          variant='faded'
          as={Link}
          href='/programs/diploma'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Diploma Programs
        </Button>
      </section>
    </main>
  );
}
