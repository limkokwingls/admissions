import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import { GraduationCap, AlertCircle } from 'lucide-react';
import ProgramCard from '@/app/(main)/students/[id]/program-card';
import Header from './header';
import AcceptanceLetterButton from './AcceptanceLetter';
import { Suspense } from 'react';
import { formatDate } from 'date-fns';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentPage({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  const properties = await getCurrentProperties();

  if (!student) {
    return notFound();
  }

  const isAdmitted = student.status === 'Admitted';
  const isWaitlisted = student.status === 'Wait Listed';

  if (!properties) {
    return notFound();
  }

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
      <Header student={student} />
      <Container width='xl'>
        <div className='mx-auto max-w-4xl py-8'>
          <ProgramCard student={student} />
          <div className='mt-6 flex flex-col gap-2'>
            {isWaitlisted && (
              <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
                <div className='p-6'>
                  <div className='mb-4'>
                    <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      NMDS Sponsorship
                    </h3>
                  </div>

                  <div className='space-y-4'>
                    <div className='rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-800/50 dark:to-neutral-900/80 dark:shadow-none'>
                      <div className='flex items-start gap-4'>
                        <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
                          <AlertCircle className='h-5 w-5' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
                            Not Sponsored
                          </h4>
                          <div className='mt-3'>
                            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                              You have been placed on the NMDS sponsorship
                              waiting list based on your academic performance.
                              NMDS sponsors a limited number of students
                              annually, and positions are highly competitive.
                            </p>

                            <div className='mt-4 rounded-md bg-white/80 p-4 dark:bg-neutral-800/50'>
                              <h5 className='font-medium text-neutral-900 dark:text-white'>
                                What this means:
                              </h5>
                              <ul className='mt-2 space-y-3 text-sm'>
                                <li className='flex items-start gap-2'>
                                  <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                                    •
                                  </span>
                                  <span className='text-neutral-700 dark:text-neutral-300'>
                                    If any sponsored students do not claim their
                                    admission, slots may become available to
                                    Wait Listed students in order of academic
                                    merit.
                                  </span>
                                </li>
                                <li className='flex items-start gap-2'>
                                  <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                                    •
                                  </span>
                                  <span className='text-neutral-700 dark:text-neutral-300'>
                                    As opportunities are limited, you should
                                    explore alternative financial arrangements
                                    for your studies.
                                  </span>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
            {isAdmitted && (
              <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
                <div className='p-6'>
                  <div className='mb-4'>
                    <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      What's Next?
                    </h3>
                  </div>

                  <div className='space-y-4'>
                    <div className='rounded-lg border border-neutral-200 bg-gradient-to-br from-neutral-100 to-neutral-50 p-6 shadow-sm dark:border-neutral-800 dark:from-neutral-800/50 dark:to-neutral-900/80 dark:shadow-none'>
                      <div className='flex items-start gap-4'>
                        <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
                          <GraduationCap className='h-5 w-5' />
                        </div>
                        <div className='flex-1'>
                          <h4 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
                            Acceptance Process
                          </h4>
                          {isAdmitted ? (
                            <div className='mt-3 space-y-4'>
                              <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                                Congratulations on your admission! You have been
                                granted both{' '}
                                <span className='font-medium text-neutral-700 dark:text-neutral-300'>
                                  university admission
                                </span>{' '}
                                and{' '}
                                <span className='font-medium text-neutral-700 dark:text-neutral-300'>
                                  NMDS sponsorship
                                </span>
                                .
                              </p>

                              <div className='rounded-md bg-white/80 p-4 dark:bg-neutral-800/50'>
                                <h5 className='font-medium text-neutral-900 dark:text-white'>
                                  Required Steps:
                                </h5>
                                <ol className='mt-2 space-y-3 text-sm'>
                                  <li className='flex items-start gap-2'>
                                    <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                                      1
                                    </span>
                                    <span className='text-neutral-700 dark:text-neutral-300'>
                                      Download your acceptance letter using the
                                      button below.
                                    </span>
                                  </li>
                                  <li className='flex items-start gap-2'>
                                    <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                                      2
                                    </span>
                                    <span className='text-neutral-700 dark:text-neutral-300'>
                                      Complete and sign the acceptance letter.
                                    </span>
                                  </li>
                                  <li className='flex items-start gap-2'>
                                    <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                                      3
                                    </span>
                                    <span className='text-neutral-700 dark:text-neutral-300'>
                                      Pay the acceptance fee of{' '}
                                      <span className='font-medium text-neutral-700 dark:text-neutral-300'>
                                        M{properties.acceptanceFee?.toFixed(2)}
                                      </span>{' '}
                                      by{' '}
                                      <span className='font-medium text-neutral-700 dark:text-neutral-300'>
                                        {formatDate(
                                          properties.acceptanceDeadline,
                                          'PPPP',
                                        )}
                                      </span>
                                      .
                                    </span>
                                  </li>
                                  <li className='flex items-start gap-2'>
                                    <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                                      4
                                    </span>
                                    <span className='text-neutral-700 dark:text-neutral-300'>
                                      Return the completed acceptance letter
                                      along with proof of payment to the
                                      Registry office by the deadline.
                                    </span>
                                  </li>
                                </ol>
                              </div>

                              <div className='rounded-md bg-amber-50 p-4 dark:bg-amber-950/30'>
                                <div className='flex items-center gap-2'>
                                  <AlertCircle className='h-4 w-4 text-amber-600 dark:text-amber-400' />
                                  <p className='font-medium text-amber-800 dark:text-amber-300'>
                                    Important Notice
                                  </p>
                                </div>
                                <p className='mt-2 text-sm text-amber-700 dark:text-amber-300'>
                                  Failure to complete these steps by the
                                  deadline will result in{' '}
                                  <span className='font-semibold'>
                                    your NMDS sponsorship
                                  </span>{' '}
                                  being revoked and given to another student on
                                  the waiting list. There are no extensions to
                                  this deadline.
                                </p>
                              </div>
                            </div>
                          ) : (
                            <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
                              You have been admitted to your program but
                              unfortunately, you have not secured NMDS
                              sponsorship. While technically on a waiting list,
                              you should make alternative financial arrangements
                              as sponsorship opportunities are extremely
                              limited.
                            </p>
                          )}

                          {isAdmitted && (
                            <div className='mt-4'>
                              <Suspense
                                fallback={
                                  <div className='text-sm'>
                                    Loading acceptance letter...
                                  </div>
                                }
                              >
                                <AcceptanceLetterButton student={student} />
                              </Suspense>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
