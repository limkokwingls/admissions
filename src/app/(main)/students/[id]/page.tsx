import { getStudent } from '@/server/students/actions';
import { Container } from '@/components/ui/container';
import { Card } from '@/components/ui/card';
import { notFound } from 'next/navigation';
import {
  GraduationCap,
  User,
  AlertCircle,
  CheckCircle,
  Clock,
  Phone,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import ProgramCard from '@/app/(main)/students/[id]/program-card';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentPage({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);

  if (!student) {
    return notFound();
  }

  const isAdmitted = student.status === 'Admitted';
  const isWaitlisted = student.status === 'Wait Listed';

  const isProgramAdmitted = isAdmitted || isWaitlisted;

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
                Student Details
              </h2>
              <h1 className='mt-2 text-2xl font-bold text-white md:text-3xl'>
                {student.surname} {student.names}
              </h1>
              <div className='mt-4 flex justify-center'>
                <span className='inline-flex items-center gap-1.5 rounded-md bg-neutral-700 px-3 py-1.5 text-sm text-white dark:bg-neutral-800'>
                  <User className='h-3.5 w-3.5' />{' '}
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

      <Container width='xl'>
        <div className='mx-auto max-w-4xl py-8'>
          <ProgramCard student={student} />
          <div className='mt-6 grid gap-6 md:grid-cols-2'>
            {isProgramAdmitted && (
              <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
                <div className='p-6'>
                  <div className='mb-4 flex items-center justify-between'>
                    <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      NMDS Sponsorship
                    </h3>
                    {isAdmitted ? (
                      <span className='rounded-md bg-emerald-100 px-2 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400'>
                        Sponsored
                      </span>
                    ) : (
                      <span className='rounded-md bg-red-100 px-2 py-1 text-xs font-medium text-red-800 dark:bg-red-900/30 dark:text-red-400'>
                        Not Sponsored
                      </span>
                    )}
                  </div>

                  <div className='rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50'>
                    {isAdmitted ? (
                      <div className='flex items-start gap-3'>
                        <div className='mt-0.5 rounded-full bg-emerald-100 p-1 dark:bg-emerald-900/50'>
                          <CheckCircle className='h-4 w-4 text-emerald-600 dark:text-emerald-400' />
                        </div>
                        <div>
                          <p className='font-medium text-neutral-900 dark:text-white'>
                            Congratulations!
                          </p>
                          <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                            You have been approved for NMDS sponsorship. Your
                            education at Limkokwing University will be fully
                            sponsored.
                          </p>
                        </div>
                      </div>
                    ) : isWaitlisted ? (
                      <div className='flex items-start gap-3'>
                        <div className='mt-0.5 rounded-full bg-amber-100 p-1 dark:bg-amber-900/50'>
                          <Clock className='h-4 w-4 text-amber-600 dark:text-amber-400' />
                        </div>
                        <div>
                          <p className='font-medium text-neutral-900 dark:text-white'>
                            Not Sponsored
                          </p>
                          <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                            Your NMDS sponsorship is currently not approved, but
                            you have been placed on the waiting list. Your
                            sponsorship may be approved if allocated slots
                            become available.
                          </p>
                        </div>
                      </div>
                    ) : (
                      <div className='flex items-start gap-3'>
                        <div className='mt-0.5 rounded-full bg-red-100 p-1 dark:bg-red-900/50'>
                          <AlertCircle className='h-4 w-4 text-red-600 dark:text-red-400' />
                        </div>
                        <div>
                          <p className='font-medium text-neutral-900 dark:text-white'>
                            Not Approved
                          </p>
                          <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                            Unfortunately, your application for NMDS sponsorship
                            was not approved at this time. Please contact the
                            Registry office for alternative funding options.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            )}

            <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
              <div className='p-6'>
                <div className='mb-4'>
                  <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                    What's Next?
                  </h3>
                </div>

                <div className='space-y-4'>
                  <div className='rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50'>
                    <div className='flex items-start gap-3'>
                      <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-1 dark:bg-neutral-700 md:block'>
                        <GraduationCap className='h-4 w-4 text-neutral-700 dark:text-neutral-300' />
                      </div>
                      <div>
                        <p className='font-medium text-neutral-900 dark:text-white'>
                          Registration Information
                        </p>
                        <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                          {isAdmitted
                            ? 'Please collect your admission letter from the Registry office. Registration begins on May 15, 2025.'
                            : isWaitlisted
                              ? 'You have been admitted to your program but unfortunately, you have not secured NMDS sponsorship. While technically on a waiting list, you should make alternative financial arrangements as sponsorship opportunities are extremely limited.'
                              : 'Your application to the program was not successful. Please contact the Registry office for more information about your application status and alternative options.'}
                        </p>
                      </div>
                    </div>
                  </div>

                  {isProgramAdmitted && (
                    <div className='rounded-lg border border-neutral-200 bg-neutral-100 p-4 dark:border-neutral-700 dark:bg-neutral-800'>
                      <h4 className='font-medium text-neutral-900 dark:text-white'>
                        Important Dates
                      </h4>
                      <ul className='mt-2 space-y-2 text-sm text-neutral-700 dark:text-neutral-300'>
                        <li className='flex items-start gap-2'>
                          <span className='mt-1 h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400'></span>
                          <span>Registration: May 15 - 30, 2025</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='mt-1 h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400'></span>
                          <span>Orientation: June 1 - 5, 2025</span>
                        </li>
                        <li className='flex items-start gap-2'>
                          <span className='mt-1 h-1 w-1 rounded-full bg-neutral-500 dark:bg-neutral-400'></span>
                          <span>Classes Begin: June 8, 2025</span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          </div>

          <div className='mb-8 mt-6 overflow-hidden rounded-lg border border-neutral-200 bg-white p-5 dark:border-neutral-800 dark:bg-neutral-900'>
            <div className='flex flex-col items-center justify-between gap-4 md:flex-row'>
              <div className='text-center md:text-left'>
                <h3 className='text-base font-bold text-neutral-900 dark:text-white'>
                  Need Assistance?
                </h3>
                <p className='mt-1 text-sm text-neutral-600 dark:text-neutral-400'>
                  Contact the Registry office for any inquiries about your
                  admission or registration.
                </p>
              </div>

              <div className='flex flex-wrap items-center gap-3'>
                <a
                  href='tel:+26622315484'
                  className='inline-flex items-center gap-2 rounded-md bg-neutral-100 px-3 py-1.5 text-sm font-medium text-neutral-800 transition-colors hover:bg-neutral-200 dark:bg-neutral-800 dark:text-neutral-200 dark:hover:bg-neutral-700'
                >
                  <Phone className='h-4 w-4' />
                  +266 2231 5484
                </a>
                <span className='text-sm text-neutral-500 dark:text-neutral-400'>
                  8:00 AM - 4:30 PM (Mon-Fri)
                </span>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
