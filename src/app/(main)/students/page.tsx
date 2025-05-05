import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Skeleton } from '@/components/ui/skeleton';
import { students } from '@/db/schema';
import { searchStudent } from '@/server/students/actions';
import { Search } from 'lucide-react';
import { Suspense } from 'react';
import Header from './header';
import StudentCard from './components/StudentCard';

type Student = typeof students.$inferSelect;

type Props = {
  searchParams: Promise<{
    q?: string;
  }>;
};

export default async function StudentsPage({ searchParams }: Props) {
  const searchQuery = (await searchParams).q || '';

  return (
    <>
      <Header searchQuery={searchQuery} />
      <Container width='xl'>
        <div className='mx-auto mt-8 max-w-4xl'>
          <Suspense fallback={<SearchResultsSkeleton />}>
            <SearchResults searchQuery={searchQuery} />
          </Suspense>
        </div>
      </Container>
    </>
  );
}

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
            No admission records found matching &quot;{searchQuery}&quot;.
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
      <div className='border-b border-neutral-200 pb-2 dark:border-neutral-800'>
        <p className='text-sm font-medium'>
          <span className='text-neutral-500 dark:text-neutral-400'>Found </span>
          <span className='font-semibold'>{results.items.length}</span>
          <span className='text-neutral-500 dark:text-neutral-400'>
            {' '}
            result{results.items.length !== 1 ? 's' : ''} for{' '}
          </span>
          <span className='font-semibold italic'>&quot;{searchQuery}&quot;</span>{' '}
          <span className='text-sm text-neutral-500 dark:text-neutral-400'>
            Click on {results.items.length > 1 ? 'any' : 'the'} student card
            below to view detailed information.
          </span>
        </p>
      </div>

      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
        {results.items.map((student: Student) => (
          <StudentCard key={student.id} student={student} />
        ))}
      </div>
    </div>
  );
}

function StudentCardSkeleton() {
  return (
    <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='p-5'>
        <div className='mb-4 flex items-start justify-between'>
          <div className='flex items-start gap-3'>
            <Skeleton className='mt-1 h-10 w-10 rounded-full' />
            <div className='space-y-2'>
              <Skeleton className='h-6 w-48' />
              <Skeleton className='h-4 w-32' />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}

function SearchResultsSkeleton() {
  return (
    <div className='space-y-6'>
      <div className='border-b border-neutral-200 pb-2 dark:border-neutral-800'>
        <Skeleton className='h-5 w-3/4' />
      </div>
      <div className='grid gap-4 sm:grid-cols-1 md:grid-cols-2'>
        <StudentCardSkeleton />
        <StudentCardSkeleton />
      </div>
    </div>
  );
}
