import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Container } from '@/components/ui/container';
import { Button } from '@/components/ui/button';
import { Check, Home, FileText } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function RegistrationSuccessPage() {
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
                Registration Complete
              </h2>
              <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                Registration Complete
              </h1>
            </div>
          </div>
        </Container>
      </div>

      <Container width='xl'>
        <div className='mx-auto max-w-2xl py-8'>
          <Card>
            <CardContent className='p-8'>
              <div className='text-center'>
                <div className='mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20'>
                  <Check className='h-8 w-8 text-green-600 dark:text-green-400' />
                </div>

                <p className='mb-6 text-neutral-600 dark:text-neutral-400'>
                  Your student information has been successfully submitted. You
                  need to finish your registration on premises by collecting
                  your proof of registration and student cards.
                </p>

                <div className='mb-6 rounded-lg bg-neutral-50 p-6 dark:bg-neutral-900'>
                  <h3 className='mb-3 font-semibold text-neutral-900 dark:text-white'>
                    What happens next?
                  </h3>
                  <ul className='space-y-2 text-left text-neutral-600 dark:text-neutral-400'>
                    <li className='flex items-start gap-2'>
                      <span className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'>
                        1
                      </span>
                      <span>
                        <strong>Diploma</strong> students should come on
                        Wednesday the 23rd of July
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'>
                        2
                      </span>
                      <span>
                        <strong>Degree</strong> students should come on Thursday
                        the 24th of July
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'>
                        3
                      </span>
                      <span>
                        Students who failed to come on Wednesday or Thursday can
                        come on Friday the 25th of July
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-600 dark:bg-blue-900/20 dark:text-blue-400'>
                        4
                      </span>
                      <span>
                        Allowance may be given to students who are unable to
                        come on Wednesday to Friday if they have a valid reason.
                      </span>
                    </li>
                  </ul>
                </div>

                <div className='flex flex-col gap-3 sm:flex-row'>
                  <Link href='/' className='flex-1'>
                    <Button variant='outline' className='w-full'>
                      <Home className='mr-2 h-4 w-4' />
                      Back to Home
                    </Button>
                  </Link>
                  <Link href='/registration' className='flex-1'>
                    <Button className='w-full'>
                      <FileText className='mr-2 h-4 w-4' />
                      Check Another Student
                    </Button>
                  </Link>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Container>
    </div>
  );
}
