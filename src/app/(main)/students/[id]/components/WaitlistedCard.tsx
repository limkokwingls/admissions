import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';
import PaymentPlanCard from './PaymentPlanCard';
import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: NonNullable<Awaited<ReturnType<typeof getCurrentProperties>>>;
};

export default function WaitlistedCard({ student, properties }: Props) {
  return (
    <>
      <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
        <div className='p-6'>
          <div className='mb-4 flex items-center gap-7'>
            <div className='mt-0.5 hidden rounded-full bg-neutral-200 p-2 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 md:block'>
              <AlertCircle className='h-5 w-5' />
            </div>
            <h3 className='text-lg font-bold text-red-600 dark:text-red-400'>
              Not Sponsored
            </h3>
          </div>

          <div className='space-y-4'>
            <div className='flex items-start gap-4'>
              <div className='flex-1'>
                <div className='mt-1'>
                  <div className='mt-2 rounded-md bg-white/80 p-4 dark:bg-neutral-800/50'>
                    <h5 className='font-medium text-neutral-900 dark:text-white'>
                      What this means:
                    </h5>
                    <ul className='mt-2 space-y-3 text-sm'>
                      <li className='flex items-start gap-2'>
                        <Dot />
                        <span className='text-neutral-700 dark:text-neutral-300'>
                          You have been admitted to the university and can
                          proceed with self-sponsorship. Please review the
                          payment plan below for financing options.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <Dot />
                        <span className='text-neutral-700 dark:text-neutral-300'>
                          In cases where sponsored students do not claim their
                          admission by the deadline, some sponsorship slots may
                          become available to students who have not secured
                          sponsorship. These slots are allocated based strictly on
                          academic merit ranking. Please note that this possibility
                          is quite limited and should not be relied upon as a primary plan.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <Dot />
                        <span className='text-neutral-700 dark:text-neutral-300'>
                          The Registry Office will contact you directly by call
                          if a sponsorship opportunity becomes available.
                          Students are strongly advised to explore alternative
                          financing options
                        </span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
      <PaymentPlanCard level={student.program.level} properties={properties} />
    </>
  );
}

function Dot() {
  return (
    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
      •
    </span>
  );
}
