import { db } from '@/lib/firebase';
import { Button, Card, CardBody, CardFooter, Link } from '@nextui-org/react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { notFound } from 'next/navigation';
import React from 'react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
  params: {
    level: string;
  };
};

async function getPrograms(level: string) {
  const q = query(
    collection(db, 'programs'),
    where('level', '==', level.toUpperCase())
  );
  return (await getDocs(q)).docs.map((doc) =>
    doc.data()
  ) as unknown as Program[];
}

export default async function ProgramLevel({ params: { level } }: Props) {
  const programs = await getPrograms(level);
  if (!programs.length) {
    return notFound();
  }

  return (
    <main>
      <Card>
        <CardFooter className='flex gap-20 sm:gap-0 items-center justify-between'>
          <Button isIconOnly variant='bordered' as={Link} href='..'>
            <MdArrowBack />
          </Button>
          <h1 className='capitalize'>{level} Programs</h1>
        </CardFooter>
      </Card>
      <section className='grid grid-cols-1 sm:grid-cols-2 gap-5 mt-10'>
        {programs.map((program) => (
          <Button
            key={program.id}
            as={Link}
            className='py-8'
            variant='faded'
            href={`/programs/${level}/${formatProgramName(program.name)}`}
          >
            {formatProgramName(program.name)}
          </Button>
        ))}
      </section>
    </main>
  );
}

function formatProgramName(name: string) {
  const parts = name.split(' ');
  const str = parts
    .map((part, index) => {
      if (index === 0) {
        return part.toUpperCase();
      }
      return part.charAt(0) + part.slice(1).toLowerCase();
    })
    .join(' ');
  return str.replace('BSC', 'BSc');
}
