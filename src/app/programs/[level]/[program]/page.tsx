import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { Suspense } from 'react';
import { Button, Card, CardFooter, Link, Spinner } from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';
import StudentsTable from './StudentsTable';

type Props = {
  params: {
    program: string;
  };
};

async function getStudents(program: string) {
  const q = query(
    collection(db, 'students'),
    where('programName', '==', program.toUpperCase())
  );
  return (await getDocs(q)).docs.map((doc) =>
    doc.data()
  ) as unknown as Student[];
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
    </main>
  );
}

async function Display({ program }: { program: string }) {
  const students = await getStudents(program);
  return <StudentsTable students={students} />;
}
