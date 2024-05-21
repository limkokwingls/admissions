import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React from 'react';
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
  const students = await getStudents(program);

  return (
    <main>
      <header className='flex gap-20 sm:gap-0 items-center sm:justify-center'>
        <h1 className='font-bold uppercase'>{program} Students</h1>
      </header>
      <section className='mt-10'>
        <StudentsTable students={students} />
      </section>
    </main>
  );
}
