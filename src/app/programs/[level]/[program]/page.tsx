import React, { Suspense } from 'react';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  Link,
  Spinner,
} from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';
import StudentsTable from './StudentsTable';

type Props = {
  params: {
    program: string;
  };
};

async function getStudents(program: string) {
  const res = await fetch(`${process.env.API_URL}/api/students/${program}`);
  return await res.json();
}

export default async function Programs({ params: { program } }: Props) {
  program = decodeURIComponent(program);

  return (
    <main>
      <Card>
        <CardFooter className='flex gap-20 sm:gap-0 items-center justify-between'>
          <Button isIconOnly variant='bordered' as={Link} href='.'>
            <MdArrowBack />
          </Button>
          <h1 className='text-sm'>{program}</h1>
        </CardFooter>
      </Card>
      <section className='mt-10'>
        <Suspense
          fallback={
            <div className='flex justify-center'>
              <Spinner />
            </div>
          }
        >
          <Display program={program} />
        </Suspense>
      </section>
      <Card className='mt-10 sm:mx-auto bg-default/30'>
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

async function Display({ program }: { program: string }) {
  const students = await getStudents(program);
  return <StudentsTable students={students} showCandidateNo />;
}
