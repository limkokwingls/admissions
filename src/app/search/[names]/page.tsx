import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  or,
  and,
  where,
  limit,
} from 'firebase/firestore';
import React, { Suspense } from 'react';
import StudentsTable from '../../programs/[level]/[program]/StudentsTable';
import { Button, Card, CardFooter, Link, Spinner } from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
  params: {
    names: string;
  };
};

async function getStudents(_fullName: string): Promise<Student[]> {
  const fullName = _fullName.trim().toLocaleUpperCase().split(' ');
  let q = query(collection(db, 'students'), limit(1));

  if (fullName.length === 1) {
    const name = fullName[0];
    q = query(
      collection(db, 'students'),
      or(where('names', '==', name), where('surname', '==', name)),
      limit(12)
    );
  } else if (fullName.length >= 2) {
    const names = fullName.pop();
    const surname = fullName.join(' ');

    console.log(names, surname);

    q = query(
      collection(db, 'students'),
      or(
        and(where('names', '==', surname), where('surname', '==', names)),
        and(where('names', '==', names), where('surname', '==', surname))
      )
    );
  }

  const results: Student[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    results.push({ id: doc.id, ...doc.data() } as Student);
  });

  // remove duplicates
  return results.filter(
    (student, index, self) =>
      index === self.findIndex((s) => s.id === student.id)
  );
}

export default async function Programs({ params: { names } }: Props) {
  names = decodeURIComponent(names);
  const students = await getStudents(names);

  return (
    <main>
      <Card>
        <CardFooter className='flex gap-20 sm:gap-0 items-center justify-between'>
          <Button isIconOnly variant='bordered' as={Link} href='..'>
            <MdArrowBack />
          </Button>
          <h1 className='text-sm'>{names}</h1>
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
          {students && students.length ? (
            <StudentsTable students={students} showProgram />
          ) : (
            <h1 className='text-center'>No Found</h1>
          )}
        </Suspense>
      </section>
    </main>
  );
}
