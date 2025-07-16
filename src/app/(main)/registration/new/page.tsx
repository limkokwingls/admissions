import React from 'react';
import { Card } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import {
  BookOpen,
  GraduationCap,
  Info,
  Phone,
  Mail,
  Search,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function NewRegistrationPage() {
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
                Access Your Admission Information
              </h1>
              <p className='mt-4 max-w-2xl text-neutral-400'>
                There are two ways to access your admission details. Choose the
                method that works best for you.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <Container width='xl'>
        <div className='mx-auto max-w-4xl py-8 pb-12'>
          <div className='grid gap-6 md:grid-cols-2'>
            <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='p-6'>
                <div className='mb-4 flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20'>
                    <Search className='h-6 w-6 text-green-600 dark:text-green-400' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      Search by Name
                    </h3>
                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                      Use your personal information
                    </p>
                  </div>
                </div>

                <div className='mb-6 space-y-3'>
                  <div className='flex items-start gap-2'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                      •
                    </span>
                    <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                      Search using your full name as it appears on your
                      application
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                      •
                    </span>
                    <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                      You can also search using your phone number
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                      •
                    </span>
                    <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                      Try your candidate number if you have one
                    </span>
                  </div>
                </div>

                <Link href='/' className='block'>
                  <Button variant='outline' className='w-full'>
                    Search by Name
                  </Button>
                </Link>
              </div>
            </Card>

            <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='p-6'>
                <div className='mb-4 flex items-center gap-4'>
                  <div className='flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/20'>
                    <GraduationCap className='h-6 w-6 text-blue-600 dark:text-blue-400' />
                  </div>
                  <div>
                    <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      Reference Number
                    </h3>
                    <p className='text-sm text-neutral-600 dark:text-neutral-400'>
                      Faster and more direct access
                    </p>
                  </div>
                </div>

                <div className='mb-6 space-y-3'>
                  <div className='flex items-start gap-2'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                      •
                    </span>
                    <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                      Direct access to your specific admission record
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                      •
                    </span>
                    <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                      Found in your admission notification
                    </span>
                  </div>
                  <div className='flex items-start gap-2'>
                    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                      •
                    </span>
                    <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                      More accurate and faster results
                    </span>
                  </div>
                </div>

                <Link href='/registration' className='block'>
                  <Button className='w-full'>Enter Reference Number</Button>
                </Link>
              </div>
            </Card>
          </div>

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
                  <div className='mt-4 space-y-3'>
                    <div className='flex items-start gap-2'>
                      <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                        •
                      </span>
                      <span className='text-neutral-700 dark:text-neutral-300'>
                        Check your admission notification email or SMS message
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
                        Contact the admissions office if you cannot locate your
                        reference number
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className='mt-6 overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='p-6'>
              <div className='flex items-start gap-4'>
                <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
                  <Phone className='h-5 w-5' />
                </div>
                <div className='flex-1'>
                  <h3 className='text-lg font-semibold text-neutral-900 dark:text-white'>
                    Need assistance?
                  </h3>
                  <p className='mt-2 text-neutral-700 dark:text-neutral-300'>
                    If you're having trouble accessing your admission details,
                    our admissions office is here to help.
                  </p>
                  <div className='mt-4 flex flex-col gap-3 sm:flex-row'>
                    <div className='flex items-center gap-2'>
                      <Phone className='h-4 w-4 text-green-600 dark:text-green-400' />
                      <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                        +267 123 4567
                      </span>
                    </div>
                    <div className='flex items-center gap-2'>
                      <Mail className='h-4 w-4 text-blue-600 dark:text-blue-400' />
                      <span className='text-sm text-neutral-700 dark:text-neutral-300'>
                        admissions@limkokwing.ac.bw
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <div className='mt-8 text-center'>
            <Link
              href='/'
              className='text-sm text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100'
            >
              ← Back to Home
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
