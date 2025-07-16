'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { getStudentByReference } from '@/server/students/actions';
import { AlertCircle, BookOpen, GraduationCap, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

type Student = NonNullable<Awaited<ReturnType<typeof getStudentByReference>>>;

export default function RegistrationPage() {
  const [reference, setReference] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [student, setStudent] = useState<Student | null>(null);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const foundStudent = await getStudentByReference(
        reference.trim().toUpperCase(),
      );
      if (!foundStudent) {
        setError(
          'Reference number not found. Please check your reference number and try again.',
        );
        return;
      }

      setStudent(foundStudent);
      setShowConfirmation(true);
    } catch (error) {
      setError(
        'Invalid reference number. Please check the format and try again.',
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleConfirm = () => {
    if (student) {
      router.push(`/students/${student.id}`);
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
                <h2 className='text-base font-medium text-neutral-300'>
                  Confirm Information
                </h2>
                <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                  {student.surname} {student.names}
                </h1>
                <div className='mt-4 flex justify-center'>
                  <span className='inline-flex items-center gap-1.5 rounded-md bg-neutral-700 px-3 py-1.5 text-sm text-white dark:bg-neutral-800'>
                    <GraduationCap className='h-3.5 w-3.5' />
                    {student.candidateNo || 'No Candidate Number'}
                  </span>
                </div>
              </div>
            </div>
          </Container>
        </div>

        <Container width='xl'>
          <div className='mx-auto max-w-4xl py-8 pb-12'>
            <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='p-6'>
                <div className='flex items-center gap-6'>
                  <div className='hidden h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 md:flex'>
                    <BookOpen className='h-6 w-6 text-neutral-700 dark:text-neutral-300' />
                  </div>

                  <div className='flex-1'>
                    <h2 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      {student.program?.name ||
                        'Program information unavailable'}
                    </h2>
                    <p className='mt-1 text-neutral-600 dark:text-neutral-400'>
                      {student.program?.faculty?.name}
                    </p>
                  </div>

                  <div className='flex items-center gap-2'>
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        student.status === 'Admitted'
                          ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                          : student.status === 'Wait Listed'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
                            : student.status === 'Private'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
                              : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                    >
                      {student.status}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            <div className='mt-6 flex gap-3'>
              <Button
                onClick={() => setShowConfirmation(false)}
                variant='outline'
                className='flex-1'
              >
                Back
              </Button>
              <Button onClick={handleConfirm} className='flex-1'>
                Continue to Details
              </Button>
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
              <h2 className='text-base font-medium text-neutral-300'>
                Student Admission Portal
              </h2>
              <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                Enter Reference Number
              </h1>
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
                      {error}
                    </div>
                  )}
                </div>

                <Button
                  type='submit'
                  disabled={isLoading || !reference.trim()}
                  className='h-12 w-full'
                >
                  {isLoading ? 'Searching...' : 'Find My Information'}
                </Button>
              </form>
            </div>
          </Card>

          <Card className='mt-6 overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
                  <Info className='h-5 w-5' />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    Where to find your reference number
                  </h3>
                  <div className='mt-3 space-y-3'>
                    <div className='flex items-start gap-2'>
                      <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                        •
                      </span>
                      <span className='text-neutral-700 dark:text-neutral-300'>
                        Check your admission notification email or SMS
                      </span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                        •
                      </span>
                      <span className='text-neutral-700 dark:text-neutral-300'>
                        Look for any official communication from the university
                      </span>
                    </div>
                    <div className='flex items-start gap-2'>
                      <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                        •
                      </span>
                      <span className='text-neutral-700 dark:text-neutral-300'>
                        Contact the admissions office if you cannot locate it
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className='mt-6 text-center'>
            <Link
              href='/'
              className='text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            >
              ← Back to search by name
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
