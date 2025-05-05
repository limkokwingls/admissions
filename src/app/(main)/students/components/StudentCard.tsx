import Link from 'next/link';
import { Card } from '@/components/ui/card';
import { User } from 'lucide-react';
import { students } from '@/db/schema';

type Student = typeof students.$inferSelect;

type Props = {
  student: Student;
};

export default function StudentCard({ student }: Props) {
  return (
    <Link href={`/students/${student.id}`}>
      <Card className='cursor-pointer overflow-hidden border border-neutral-200 bg-white transition-all duration-300 hover:shadow-lg dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='p-5'>
          <div className='mb-4 flex items-start justify-between'>
            <div className='flex items-start gap-3'>
              <div className='mt-1 rounded-full bg-neutral-100 p-2 dark:bg-neutral-800'>
                <User className='size-6 text-neutral-600 dark:text-neutral-300' />
              </div>
              <div>
                <h2 className='text-lg font-semibold'>
                  {student.surname} {student.names}
                </h2>
                <div className='flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300'>
                  <span>Candidate No: </span>
                  <span className='font-medium'>{student.candidateNo}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
