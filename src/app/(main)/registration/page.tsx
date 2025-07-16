'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Input } from '@/components/ui/input';
import { getStudentByReference } from '@/server/students/actions';
import { IconCircleDot, IconInfoCircle } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, BookOpen, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

type Student = NonNullable<Awaited<ReturnType<typeof getStudentByReference>>>;

export default function RegistrationPage() {
  const [reference, setReference] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const {
    data: student,
    isLoading,
    error,
    refetch,
  } = useQuery<Student | null, Error>({
    queryKey: ['studentByReference', reference.trim().toUpperCase()],
    queryFn: async () => {
      if (!reference.trim()) return null;
      const foundStudent = await getStudentByReference(
        reference.trim().toUpperCase(),
      );
      if (!foundStudent) {
        throw new Error(
          'Reference number not found. Please check your reference number and try again.',
        );
      }
      return foundStudent;
    },
    enabled: false,
    staleTime: Infinity,
    retry: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirmation(false);
    try {
      const result = await refetch();
      if (result.isError) {
        console.error(result.error);
      } else if (result.data) {
        setShowConfirmation(true);
      }
    } catch (err) {
      console.error('Error during refetch:', err);
    }
  };

  const handleConfirm = () => {
    if (student) {
      router.push(`/registration/${student.id}`);
    }
  };

  if (showConfirmation && student) {
    return (
      <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
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
                <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                  Verify Your Details
                </h1>
                <p className='mt-2 text-sm text-neutral-300'>
                  Please confirm the information below is correct before
                  continuing
                </p>
              </div>
            </div>
          </Container>
        </div>

        <Container width='xl'>
          <div className='mx-auto max-w-4xl py-8 pb-12'>
            <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='p-6'>
                <div className='space-y-6'>
                  <div>
                    <h3 className='mb-4 text-lg font-semibold text-neutral-900 dark:text-white'>
                      Student Information
                    </h3>

                    <div className='grid gap-4 md:grid-cols-2'>
                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
                          Full Name
                        </label>
                        <div className='rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800'>
                          <p className='font-medium text-neutral-900 dark:text-white'>
                            {student.surname} {student.names}
                          </p>
                        </div>
                      </div>

                      <div className='space-y-2'>
                        <label className='text-sm font-medium text-neutral-600 dark:text-neutral-400'>
                          Candidate Number
                        </label>
                        <div className='rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800'>
                          <p className='font-medium text-neutral-900 dark:text-white'>
                            {student.candidateNo || 'No Candidate Number'}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className='mb-4 text-lg font-semibold text-neutral-900 dark:text-white'>
                      Program of Study
                    </h3>

                    <div className='rounded-md border border-neutral-200 bg-neutral-50 p-3 dark:border-neutral-700 dark:bg-neutral-800 md:p-4'>
                      <div className='flex items-start gap-3 md:items-center md:gap-4'>
                        <div className='mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-neutral-200 dark:bg-neutral-700 md:mt-0 md:h-12 md:w-12'>
                          <BookOpen className='h-5 w-5 text-neutral-700 dark:text-neutral-300 md:h-6 md:w-6' />
                        </div>
                        <div className='min-w-0 flex-1'>
                          <h4 className='font-semibold leading-tight text-neutral-900 dark:text-white'>
                            {student.program?.name ||
                              'Program information unavailable'}
                          </h4>
                          <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                            {student.program?.faculty?.name}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {!student.accepted && (
              <Card className='mt-6 overflow-hidden border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20'>
                <div className='p-6'>
                  <div className='flex items-start gap-4'>
                    <div className='mt-0.5 rounded-full bg-red-200 p-2 text-red-700 dark:bg-red-800 dark:text-red-300'>
                      <AlertCircle className='size-6' />
                    </div>
                    <div className='flex-1'>
                      <h3 className='text-lg font-semibold text-red-900 dark:text-red-100'>
                        Registration Not Approved
                      </h3>
                      <p className='mt-1 text-sm text-red-700 dark:text-red-300'>
                        You have not been approved to proceed with registration.
                        Please consult the Registry Office for further
                        assistance.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            )}

            <div className='mt-6 flex gap-3'>
              <Button
                onClick={() => setShowConfirmation(false)}
                variant='outline'
                className='flex-1'
              >
                Back
              </Button>
              {student.accepted && (
                <Button onClick={handleConfirm} className='flex-1'>
                  Confirm and Continue
                </Button>
              )}
            </div>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
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
              <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                Registration Portal
              </h1>
              <p className='mt-2 text-sm text-neutral-300'>
                Enter your reference number to continue
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container width='xl'>
        <div className='mx-auto max-w-2xl py-8 pb-12'>
          <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='p-6'>
              <form onSubmit={handleSubmit} className='space-y-6'>
                <div>
                  <label
                    htmlFor='reference'
                    className='mb-2 block text-sm font-medium text-neutral-900 dark:text-white'
                  >
                    Reference Number
                  </label>
                  <Input
                    id='reference'
                    type='text'
                    value={reference}
                    onChange={(e) => setReference(e.target.value)}
                    placeholder='Enter your reference number'
                    className='h-12 text-base'
                    required
                  />
                  {error && (
                    <div className='mt-2 flex items-center gap-2 text-sm text-red-600 dark:text-red-400'>
                      <AlertCircle className='h-4 w-4' />
                      {error.message}
                    </div>
                  )}
                </div>

                <Button
                  type='submit'
                  disabled={isLoading || !reference.trim()}
                  className='w-full'
                >
                  {isLoading ? 'Searching...' : 'Continue'}
                </Button>
              </form>
            </div>
          </Card>

          <Card className='mt-6 overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
                  <IconInfoCircle className='size-5' />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    Where to find your reference number
                  </h3>
                  <div className='mt-3 space-y-3'>
                    <div className='flex items-start gap-2'>
                      <IconCircleDot className='size-5 text-neutral-500' />
                      <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                        Locate the reference number at the top right corner of
                        your admission letter (e.g.{' '}
                        <span className='font-mono font-bold text-neutral-900 dark:text-white'>
                          FICT/DBIT/P/16
                        </span>
                        )
                      </span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <IconCircleDot className='size-5 text-neutral-500' />
                      <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                        Contact the registry office if you cannot locate your
                        admission letter or reference number
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </div>
  );
}
