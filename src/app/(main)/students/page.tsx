import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { students } from '@/db/schema';
import { searchStudent } from '@/server/students/actions';
import { Calendar, Loader2, Search, User } from 'lucide-react';
import Link from 'next/link';
import { Suspense } from 'react';

type SearchParams = {
  q?: string;
};

type Student = typeof students.$inferSelect;

async function SearchResults({ searchQuery }: { searchQuery: string }) {
  if (!searchQuery.trim()) {
    return (
      <div className='flex flex-col items-center justify-center space-y-4 rounded-lg border border-neutral-200 bg-neutral-900/5 px-4 py-12 text-center dark:border-neutral-800 dark:bg-neutral-100/5'>
        <Search className='h-12 w-12 text-neutral-400 dark:text-neutral-500' />
        <div>
          <h3 className='text-lg font-medium'>Check Your Admission Status</h3>
          <p className='mt-1 text-muted-foreground'>
            Enter your name or candidate number to check if you have been
            admitted.
          </p>
        </div>
      </div>
    );
  }

  const results = await searchStudent(searchQuery);

  if (!results.items.length) {
    return (
      <div className='flex flex-col items-center justify-center space-y-4 rounded-lg border border-neutral-200 bg-neutral-900/5 px-4 py-12 text-center dark:border-neutral-800 dark:bg-neutral-100/5'>
        <Search className='h-12 w-12 text-neutral-400 dark:text-neutral-500' />
        <div>
          <h3 className='text-lg font-medium'>No Results Found</h3>
          <p className='mt-1 text-muted-foreground'>
            No admission records found matching "{searchQuery}".
          </p>
          <p className='mt-2 text-sm text-neutral-500 dark:text-neutral-400'>
            Try using different keywords or check the spelling of your name or
            candidate number.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between border-b border-neutral-200 pb-2 dark:border-neutral-800'>
        <p className='text-sm font-medium'>
          <span className='text-neutral-500 dark:text-neutral-400'>Found </span>
          <span className='font-semibold'>{results.items.length}</span>
          <span className='text-neutral-500 dark:text-neutral-400'>
            {' '}
            result{results.items.length !== 1 ? 's' : ''} for{' '}
          </span>
          <span className='font-semibold italic'>"{searchQuery}"</span>
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
        {results.items.map((student: Student) => (
          <Link href={`/students/${student.id}`} key={student.id}>
            <Card className='cursor-pointer overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='p-5'>
                <div className='mb-4 flex items-start justify-between'>
                  <div className='flex items-center gap-3'>
                    <div className='rounded-full bg-neutral-100 p-2 dark:bg-neutral-800'>
                      <User className='h-5 w-5 text-neutral-600 dark:text-neutral-300' />
                    </div>
                    <div>
                      <h2 className='text-lg font-semibold'>
                        {student.surname} {student.names}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className='mb-4 space-y-2'>
                  <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
                    <Calendar className='h-4 w-4' />
                    <span>Candidate No: </span>
                    <span className='font-medium'>{student.candidateNo}</span>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function StudentsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const searchQuery = searchParams.q || '';

  return (
    <Container width='xl' className='py-8'>
      <div className='mb-8 space-y-2'>
        <div className='mb-6 flex flex-col items-center text-center'>
          <div>
            <h1 className='text-3xl font-bold'>Admission Status Check</h1>
            <p className='mx-auto mt-2 max-w-2xl text-neutral-500 dark:text-neutral-400'>
              Check if you have been admitted to Limkokwing University. Enter
              your name or candidate number below.
            </p>
          </div>
        </div>

        <div className='mx-auto mt-6 max-w-2xl rounded-lg border border-neutral-200 bg-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:bg-neutral-900'>
          <form action='/students' className='flex flex-col gap-3 sm:flex-row'>
            <div className='relative flex-grow'>
              <Search className='absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 transform text-neutral-500 dark:text-neutral-400' />
              <Input
                name='q'
                defaultValue={searchQuery}
                placeholder='Enter your name or candidate number...'
                className='border-neutral-300 bg-white pl-10 dark:border-neutral-700 dark:bg-neutral-800'
              />
            </div>
            <Button
              type='submit'
              className='bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800'
            >
              Check Status
            </Button>
          </form>
        </div>
      </div>

      <div className='mx-auto mt-8 max-w-4xl'>
        <Suspense
          fallback={
            <div className='flex items-center justify-center rounded-lg border border-neutral-200 bg-neutral-50 py-12 dark:border-neutral-800 dark:bg-neutral-900'>
              <Loader2 className='h-8 w-8 animate-spin text-blue-600 dark:text-blue-400' />
              <span className='ml-3 font-medium text-neutral-600 dark:text-neutral-300'>
                Checking admission status...
              </span>
            </div>
          }
        >
          <SearchResults searchQuery={searchQuery} />
        </Suspense>
      </div>
    </Container>
  );
}
