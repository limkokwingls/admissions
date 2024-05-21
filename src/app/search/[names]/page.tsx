import { db } from '@/lib/firebase';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  QueryDocumentSnapshot,
} from 'firebase/firestore';
import React from 'react';
import StudentsTable from './StudentsTable';
import { Button, Card, CardFooter, Link } from '@nextui-org/react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
  params: {
    names: string;
  };
};

// student in the database have firstName and lastName, but we are passing names which
// might be the firstName or lastName or both, so we need to search for students with
// either the firstName or lastName or both matching the names
async function getStudents(fullName: string) {
  const names = fullName.toUpperCase().trim().split(/\s+/);
  const firstName = names[0];
  const lastName = names.length > 1 ? names[names.length - 1] : '';

  const studentsCollection = collection(db, 'students');
  const queryConstraints = [];

  if (firstName) {
    queryConstraints.push(where('names', '==', firstName));
  }

  if (lastName) {
    queryConstraints.push(where('surname', '==', lastName));
  }

  const q = query(
    studentsCollection,
    ...queryConstraints,
    orderBy('names'),
    orderBy('surname')
  );

  const querySnapshot = await getDocs(q);
  const students: Student[] = [];

  querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
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
          <Button isIconOnly variant='bordered' as={Link} href='..'>
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
