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

      <Card className='mt-5 lg:mt-10 sm:mx-auto bg-default/30'>
        <CardBody className='p-6 sm:p-8'>
          <p className='text-sm'>
            Please note that if you are on the waiting list, you have been
            admitted to the university but have been waitlisted for NMDS
            sponsorship. You may choose to sponsor yourself and join the
            university. In the event that some admitted students fail to collect
            their acceptance letters, waitlisted students will be given the
            opportunity to move from the waiting list to the NMDS admitted
            students&apos; sponsorship list.
          </p>
        </CardBody>
      </Card>
    </main>
  );
}
