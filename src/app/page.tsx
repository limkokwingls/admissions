import { Button } from '@nextui-org/react';
import Link from 'next/link';
import { MdArrowRight } from 'react-icons/md';
import LookupField from './home/LookupField';

export default function Home() {
  return (
    <main>
      <LookupField />
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
