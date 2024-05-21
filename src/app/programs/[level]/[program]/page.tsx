import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
import StudentsTable from './StudentsTable';
import { Button, Card, CardFooter, Link } from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';

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
  const students = await getStudents(program);

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
        <StudentsTable students={students} />
      </section>
    </main>
  );
}
