'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { getStudent } from '@/server/students/actions';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, ArrowLeft, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import StudentInfoForm from './StudentInfoForm';

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default function StudentRegistrationPage({ params }: Props) {
  const [studentId, setStudentId] = useState<string>('');
  const router = useRouter();

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
          <StudentInfoForm student={student} onBack={() => router.back()} />
        </div>
      </Container>
    </div>
  );
}
