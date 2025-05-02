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
import Header from './header';

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
      <Header student={student} />
      <Container width='xl'>
        <div className='mx-auto max-w-4xl py-8'>
          <ProgramCard student={student} />
          <div className='mt-6 flex flex-col gap-2'>
            {isProgramAdmitted && (
              <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
                <div className='p-6'>
                  <div className='mb-4 flex items-center justify-between'>
                    <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
                      NMDS Sponsorship
                    </h3>
                  </div>

                  <div className='rounded-lg bg-neutral-50 p-4 dark:bg-neutral-800/50'>
                    {isAdmitted ? (
                      <div className='flex items-start gap-3'>
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
                    ) : (
                      <div className='flex items-start gap-3'>
                        <div>
                          <p className='font-medium text-red-900 dark:text-red-400'>
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
                    )}
                  </div>
                </div>
              </Card>
            )}
            {isProgramAdmitted && (
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
                              : 'You have been admitted to your program but unfortunately, you have not secured NMDS sponsorship. While technically on a waiting list, you should make alternative financial arrangements as sponsorship opportunities are extremely limited.'}
                          </p>
                        </div>
                      </div>
                    </div>

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
