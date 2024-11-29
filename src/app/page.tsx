import { Card, CardBody } from '@nextui-org/react';
import Link from 'next/link';
import { MdArrowRight } from 'react-icons/md';

const programs = [
  'Certificate In Architecture Technology',
  'Certificate In Business Information Technology',
  'Certificate In Graphic Design',
  'Certificate In Innovation Travel And Tourism',
  'Certificate In Marketing',
  'Certificate In Performing Arts',
];

export default function Home() {
  return (
    <main>
      <h1 className='text-center font-extralight text-3xl'>
        TVET Admissions 2025
      </h1>
      <section className='mt-10 grid sm:grid-cols-2 gap-4 max-w-6xl mx-auto px-4'>
        {programs.map((it) => (
          <Link key={it} href={`/programs/${it}`} className='group'>
            <Card className='border border-transparent hover:border-foreground-300 transition-colors duration-200'>
              <CardBody className='p-6 flex flex-row items-center justify-between'>
                <span className='text-sm text-center sm:text-left'>{it}</span>
                <MdArrowRight className='text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200' />
              </CardBody>
            </Card>
          </Link>
        ))}
      </section>

      <Card className='mt-10 sm:w-[33rem] sm:mx-auto bg-default/30 lg:hidden'>
        <CardBody className='p-6 sm:p-8'>
          <p className='text-sm'>
            Admitted students must collect their acceptance letters from the
            Limkokwing Registry Department on/after{' '}
            <span className='font-bold'>December 2, 2024</span>
          </p>
        </CardBody>
      </Card>
    </main>
  );
}
