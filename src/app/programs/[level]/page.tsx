import { formatProgramName } from '@/lib/format';
import { Button, Card, CardFooter, Link, Skeleton } from '@nextui-org/react';
import { Suspense } from 'react';
import { MdArrowBack } from 'react-icons/md';

type Props = {
  params: {
    level: string;
  };
};

async function getPrograms(level: string) {
  const programs = await fetch(`${process.env.API_URL}/api/programs/${level}`);
  return (await programs.json()) as Program[];
}

export default async function ProgramLevel({ params: { level } }: Props) {
  const programs = await getPrograms(level);
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
        <Suspense fallback={<Loading />}>
          <Display level={level} />
        </Suspense>
      </section>
    </main>
  );
}

function Loading() {
  return Array.from({ length: 4 }).map((_, index) => (
    <Skeleton key={index} className='py-8 rounded-lg' />
  ));
}

async function Display({ level }: { level: string }) {
  const programs = await getPrograms(level);

  return programs.map((program) => (
    <Button
      key={program.id}
      as={Link}
      className='py-8'
      variant='faded'
      href={`/programs/${level}/${formatProgramName(program.name)}`}
    >
      {formatProgramName(program.name)}
    </Button>
  ));
}
