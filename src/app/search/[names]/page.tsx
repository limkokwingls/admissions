import { db } from '@/lib/firebase';
import { collection, getDocs, query, where, or } from 'firebase/firestore';
import React from 'react';
import StudentsTable from './StudentsTable';
import { Button, Card, CardFooter, Link } from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
  params: {
    names: string;
  };
};

async function getStudents(fullName: string) {
  const names = fullName.trim().toUpperCase();
  const students: Student[] = [];
  const q = query(
    collection(db, 'students'),
    or(
      where('firstName', '==', names),
      where('lastName', '==', names),
      where('firstName', '==', names.split(' ')[0]),
      where('lastName', '==', names.split(' ')[1])
    )
  );
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    students.push(doc.data() as Student);
  });
  return students;
}

export default async function Programs({ params: { names } }: Props) {
  names = decodeURIComponent(names);
  const students = await getStudents(names);

  return (
    <main>
      <Card>
        <CardFooter className='flex gap-20 sm:gap-0 items-center justify-between'>
          <Button isIconOnly variant='bordered' as={Link} href='.'>
            <MdArrowBack />
          </Button>
          <h1 className='text-sm'>{names}</h1>
        </CardFooter>
      </Card>
      <section className='mt-10'>
        <StudentsTable students={students} />
      </section>
    </main>
  );
}
