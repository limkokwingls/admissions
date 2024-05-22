import { db } from '@/lib/firebase';
import { collection, getDocs, query, where } from 'firebase/firestore';
import React, { Suspense } from 'react';
import StudentsTable from '../../programs/[level]/[program]/StudentsTable';
import { Button, Card, CardFooter, Link, Spinner } from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
  params: {
    names: string;
  };
};

async function getStudents(fullName: string): Promise<Student[]> {
  const names = fullName.trim().toLocaleUpperCase().split(' ');
  let queries = [];

  if (names.length === 1) {
    queries.push(
      query(collection(db, 'students'), where('names', '==', names[0]))
    );
    queries.push(
      query(collection(db, 'students'), where('surname', '==', names[0]))
    );
  } else if (names.length >= 2) {
    const firstName = names[0];
    const lastName = names[names.length - 1];

    queries.push(
      query(
        collection(db, 'students'),
        where('names', '==', firstName),
        where('surname', '==', lastName)
      )
    );
    queries.push(
      query(
        collection(db, 'students'),
        where('names', '==', lastName),
        where('surname', '==', firstName)
      )
    );
    queries.push(
      query(collection(db, 'students'), where('names', '==', firstName))
    );
    queries.push(
      query(collection(db, 'students'), where('surname', '==', lastName))
    );
  }

  const results: Student[] = [];
  for (let q of queries) {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      results.push({ id: doc.id, ...doc.data() } as Student);
    });
  }

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
