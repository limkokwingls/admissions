import { Suspense } from 'react';
import { searchStudent } from '@/server/students/actions';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Container } from '@/components/ui/container';
import Link from 'next/link';
import {
  Loader2,
  Search,
  User,
  Calendar,
  ExternalLink,
  CheckCircle,
} from 'lucide-react';
import { students } from '@/db/schema';

type SearchParams = {
  q?: string;
};

type Student = typeof students.$inferSelect;

async function SearchResults({ searchQuery }: { searchQuery: string }) {
  if (!searchQuery.trim()) {
    return (
      <div className='flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 bg-neutral-900/5 dark:bg-neutral-100/5 rounded-lg border border-neutral-200 dark:border-neutral-800'>
        <Search className='h-12 w-12 text-neutral-400 dark:text-neutral-500' />
        <div>
          <h3 className='text-lg font-medium'>Check Your Admission Status</h3>
          <p className='text-muted-foreground mt-1'>
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
      <div className='flex flex-col items-center justify-center py-12 px-4 text-center space-y-4 bg-neutral-900/5 dark:bg-neutral-100/5 rounded-lg border border-neutral-200 dark:border-neutral-800'>
        <Search className='h-12 w-12 text-neutral-400 dark:text-neutral-500' />
        <div>
          <h3 className='text-lg font-medium'>No Results Found</h3>
          <p className='text-muted-foreground mt-1'>
            No admission records found matching "{searchQuery}".
          </p>
          <p className='text-sm mt-2 text-neutral-500 dark:text-neutral-400'>
            Try using different keywords or check the spelling of your name or
            candidate number.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between pb-2 border-b border-neutral-200 dark:border-neutral-800'>
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
          <Card
            key={student.id}
            className='overflow-hidden hover:shadow-lg transition-all duration-300 border border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900'
          >
            <div className='p-5'>
              <div className='flex justify-between items-start mb-4'>
                <div className='flex items-center gap-3'>
                  <div className='bg-neutral-100 dark:bg-neutral-800 p-2 rounded-full'>
                    <User className='h-5 w-5 text-neutral-600 dark:text-neutral-300' />
                  </div>
                  <div>
                    <h2 className='text-lg font-semibold'>
                      {student.surname} {student.names}
                    </h2>
                  </div>
                </div>
              </div>

              <div className='space-y-2 mb-4'>
                <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
                  <Calendar className='h-4 w-4' />
                  <span>Candidate No: </span>
                  <span className='font-medium'>{student.candidateNo}</span>
                </div>
              </div>

              <div className='pt-3 border-t border-neutral-200 dark:border-neutral-800'>
                <Link href={`/students/${student.id}`}>
                  <Button
                    variant='ghost'
                    className='w-full justify-between group'
                  >
                    View Admission Details
                    <ExternalLink className='h-4 w-4 transition-transform group-hover:translate-x-1' />
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
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
        <div className='flex flex-col items-center text-center mb-6'>
          <div>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-blue-700 to-purple-700 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent'>
              Admission Status Check
            </h1>
            <p className='text-neutral-500 dark:text-neutral-400 mt-2 max-w-2xl mx-auto'>
              Check if you have been admitted to Limkokwing University. Enter
              your name or candidate number below.
            </p>
          </div>
        </div>

        <div className='mt-6 p-6 rounded-lg bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm max-w-2xl mx-auto'>
          <form action='/students' className='flex flex-col sm:flex-row gap-3'>
            <div className='relative flex-grow'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-neutral-500 dark:text-neutral-400' />
              <Input
                name='q'
                defaultValue={searchQuery}
                placeholder='Enter your name or candidate number...'
                className='pl-10 bg-white dark:bg-neutral-800 border-neutral-300 dark:border-neutral-700'
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

      <div className='mt-8 max-w-4xl mx-auto'>
        <Suspense
          fallback={
            <div className='flex justify-center items-center py-12 bg-neutral-50 dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800'>
              <Loader2 className='h-8 w-8 animate-spin text-blue-600 dark:text-blue-400' />
              <span className='ml-3 text-neutral-600 dark:text-neutral-300 font-medium'>
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
