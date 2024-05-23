import { Button, Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import { MdArrowRight } from 'react-icons/md';

export default function Home() {
  return (
    <main>
      {/* <LookupField /> */}
      <section className='mt-10 flex sm:justify-center flex-col sm:flex-row gap-3 sm:gap-8 w-full'>
        <Button
          className='py-8 sm:px-11'
          variant='faded'
          as={Link}
          href='/programs/degree'
          endContent={<MdArrowRight className='text-xl' />}
        >
          Degree Programs
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

      <Card className='mt-10 sm:w-[33rem] sm:mx-auto bg-default/30 lg:hidden'>
        <CardBody className='p-6 sm:p-8'>
          <p className='text-sm'>
            Admitted students must collect their acceptance letters from the
            Limkokwing Registry Department and submit the completed forms by{' '}
            <span className='font-bold'>June 7, 2024</span>. Failure to do so
            will result in losing your slot.
          </p>
        </CardBody>
      </Card>
    </main>
  );
}
