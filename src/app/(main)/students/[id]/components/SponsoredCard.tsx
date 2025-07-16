import { Card } from '@/components/ui/card';
import { GraduationCap, AlertCircle } from 'lucide-react';
import AcceptanceLetterButton from './AcceptanceLetter';
import { Suspense } from 'react';
import { formatDate } from 'date-fns';
import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { getCallsByStudentId } from '@/server/calls/actions';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: NonNullable<Awaited<ReturnType<typeof getCurrentProperties>>>;
  calls: Awaited<ReturnType<typeof getCallsByStudentId>>;
};

export default function SponsoredCard({ student, properties, calls }: Props) {
  return (
    <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='p-6'>
        <div className='mb-4'>
          <h3 className='text-lg font-bold text-neutral-900 dark:text-white'>
            What&apos;s Next?
          </h3>
        </div>

        <div className='space-y-4'>
          <div className='flex items-start gap-4'>
            <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
              <GraduationCap className='h-5 w-5' />
            </div>
            <div className='flex-1'>
              <h4 className='text-lg font-semibold text-neutral-900 dark:text-neutral-100'>
                Acceptance Process
              </h4>
              <div className='mt-3 space-y-4'>
                <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                  Congratulations on your admission! You have been granted both{' '}
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
                        Download your acceptance letter using the button below.
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
                          {formatDate(properties.acceptanceDeadline, 'PPPP')}
                        </span>
                        .
                      </span>
                    </li>
                    <li className='flex items-start gap-2'>
                      <span className='flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
                        4
                      </span>
                      <span className='text-neutral-700 dark:text-neutral-300'>
                        Bring the completed acceptance letter along with proof
                        of payment and your identity document to the Registry
                        office on or before the deadline.
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
                    Failure to complete these steps by the deadline will result
                    in{' '}
                    <span className='font-semibold'>your NMDS sponsorship</span>{' '}
                    being revoked and given to another student. There are no
                    extensions to this deadline.
                  </p>
                </div>
              </div>

              <div className='mt-4'>
                <Suspense
                  fallback={
                    <div className='text-sm'>Loading acceptance letter...</div>
                  }
                >
                  <AcceptanceLetterButton
                    student={student}
                    properties={properties}
                    calls={calls}
                  />
                </Suspense>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
