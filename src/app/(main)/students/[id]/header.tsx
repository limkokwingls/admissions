import React from 'react';
import { getStudent } from '@/server/students/actions';
import { getCallsByStudentId } from '@/server/calls/actions';
import Link from 'next/link';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { CheckCircle, AlertCircle, GraduationCap } from 'lucide-react';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  calls: Awaited<ReturnType<typeof getCallsByStudentId>>;
};

export default function header({ student, calls }: Props) {
  const hasAcceptedCall = calls.some((call) => call.status === 'accepted');
  const isAdmitted = student.status === 'Admitted' || hasAcceptedCall;
  const isWaitlisted = student.status === 'Wait Listed';

  const isProgramAdmitted = isAdmitted || isWaitlisted;
  return (
    <div className='bg-neutral-800 dark:bg-neutral-900'>
      <Container width='xl'>
        <div className='flex flex-col items-center py-8 md:py-10'>
          <Link href='/'>
            <Image
              src='/images/logo-dark.png'
              alt='Limkokwing University Logo'
              className='w-48'
              width={270}
              height={135}
              priority
            />
          </Link>

          <div className='mt-8 flex flex-col items-center text-center'>
            <h2 className='text-base font-medium text-neutral-300'>
              Admission Details
            </h2>
            <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
              {student.surname} {student.names}
            </h1>
            <div className='mt-4 flex justify-center'>
              <span className='inline-flex items-center gap-1.5 rounded-md bg-neutral-700 px-3 py-1.5 text-sm text-white dark:bg-neutral-800'>
                <GraduationCap className='h-3.5 w-3.5' />{' '}
                {student.candidateNo || 'No Candidate Number'}
              </span>
            </div>

            <div className='mt-5 flex flex-col items-center gap-3'>
              <div className='flex flex-wrap justify-center gap-3'>
                {isProgramAdmitted ? (
                  <div className='flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm dark:bg-emerald-900/20 dark:text-emerald-400'>
                    <CheckCircle className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                    <span>Admitted</span>
                  </div>
                ) : (
                  <div className='flex items-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm dark:bg-red-900/20 dark:text-red-400'>
                    <AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
                    <span>Not Admitted</span>
                  </div>
                )}

                {isProgramAdmitted &&
                  (isAdmitted ? (
                    <div className='flex items-center gap-2 rounded-md bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 shadow-sm dark:bg-emerald-900/20 dark:text-emerald-400'>
                      <CheckCircle className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                      <span>Sponsored</span>
                    </div>
                  ) : (
                    <div className='flex items-center gap-2 rounded-md bg-red-50 px-4 py-2 text-sm font-medium text-red-700 shadow-sm dark:bg-red-900/20 dark:text-red-400'>
                      <AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
                      <span>Not Sponsored</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
