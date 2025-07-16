'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { User, Check, AlertCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';
import { getStudent } from '@/server/students/actions';
import StudentInfoForm from './components/StudentInfoForm';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function StudentRegistrationPage({ params }: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const [showForm, setShowForm] = useState(false);

  React.useEffect(() => {
    params.then(({ id }) => setStudentId(id));
  }, [params]);

  const {
    data: student,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['student', studentId],
    queryFn: () => getStudent(studentId),
    enabled: !!studentId,
  });

  if (isLoading) {
    return (
      <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
        <div className='bg-neutral-800 dark:bg-neutral-900'>
          <Container width='xl'>
            <div className='flex flex-col items-center py-8'>
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
            </div>
          </Container>
        </div>
        <Container width='xl'>
          <div className='mx-auto max-w-2xl py-8'>
            <Card>
              <CardContent className='p-8'>
                <div className='flex items-center justify-center'>
                  <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-blue-600'></div>
                  <span className='ml-2 text-neutral-600 dark:text-neutral-400'>
                    Loading student information...
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  if (error || !student) {
    return (
      <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
        <div className='bg-neutral-800 dark:bg-neutral-900'>
          <Container width='xl'>
            <div className='flex flex-col items-center py-8'>
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
            </div>
          </Container>
        </div>
        <Container width='xl'>
          <div className='mx-auto max-w-2xl py-8'>
            <Card>
              <CardContent className='p-8'>
                <div className='text-center'>
                  <AlertCircle className='mx-auto mb-4 h-12 w-12 text-red-500' />
                  <h2 className='mb-2 text-xl font-semibold text-neutral-900 dark:text-white'>
                    Student Not Found
                  </h2>
                  <p className='mb-6 text-neutral-600 dark:text-neutral-400'>
                    The student ID you provided could not be found in our
                    system.
                  </p>
                  <Link href='/registration'>
                    <Button variant='outline'>
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back to Registration
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  if (student.studentInfo) {
    return (
      <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
        <div className='bg-neutral-800 dark:bg-neutral-900'>
          <Container width='xl'>
            <div className='flex flex-col items-center py-8'>
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
            </div>
          </Container>
        </div>
        <Container width='xl'>
          <div className='mx-auto max-w-2xl py-8'>
            <Card>
              <CardContent className='p-8'>
                <div className='text-center'>
                  <Check className='mx-auto mb-4 h-12 w-12 text-green-500' />
                  <h2 className='mb-2 text-xl font-semibold text-neutral-900 dark:text-white'>
                    Information Already Submitted
                  </h2>
                  <p className='mb-6 text-neutral-600 dark:text-neutral-400'>
                    Your student information has already been submitted and is
                    being processed.
                  </p>
                  <Link href='/registration'>
                    <Button variant='outline'>
                      <ArrowLeft className='mr-2 h-4 w-4' />
                      Back to Registration
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </Container>
      </div>
    );
  }

  if (showForm) {
    return (
      <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
        <div className='bg-neutral-800 dark:bg-neutral-900'>
          <Container width='xl'>
            <div className='flex flex-col items-center py-8'>
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
              <div className='mt-8 text-center'>
                <h2 className='text-base font-medium text-neutral-300'>
                  Student Registration
                </h2>
                <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                  Student Information Form
                </h1>
              </div>
            </div>
          </Container>
        </div>

        <Container width='xl'>
          <div className='mx-auto max-w-4xl py-8'>
            <StudentInfoForm
              studentId={studentId}
              onBack={() => setShowForm(false)}
            />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
      <div className='bg-neutral-800 dark:bg-neutral-900'>
        <Container width='xl'>
          <div className='flex flex-col items-center py-8'>
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
            <div className='mt-8 text-center'>
              <h2 className='text-base font-medium text-neutral-300'>
                Student Registration
              </h2>
              <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                Complete Your Registration
              </h1>
            </div>
          </div>
        </Container>
      </div>

      <Container width='xl'>
        <div className='mx-auto max-w-2xl py-8'>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <User className='h-5 w-5' />
                Student Found
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
                <div>
                  <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Full Name
                  </label>
                  <p className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    {student.surname} {student.names}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Student Number
                  </label>
                  <p className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    {student.no}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Candidate Number
                  </label>
                  <p className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    {student.candidateNo || 'N/A'}
                  </p>
                </div>
                <div>
                  <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Phone Number
                  </label>
                  <p className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    {student.phoneNumber}
                  </p>
                </div>
                <div className='md:col-span-2'>
                  <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Program
                  </label>
                  <p className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    {student.program?.name}
                  </p>
                </div>
                <div className='md:col-span-2'>
                  <label className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Status
                  </label>
                  <div className='mt-1'>
                    <Badge variant={student.accepted ? 'default' : 'secondary'}>
                      {student.status}
                    </Badge>
                  </div>
                </div>
              </div>

              <div className='border-t pt-6'>
                <p className='mb-4 text-neutral-600 dark:text-neutral-400'>
                  Please complete your student information form to proceed with
                  your registration.
                </p>
                <Button onClick={() => setShowForm(true)} className='w-full'>
                  Continue to Information Form
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
