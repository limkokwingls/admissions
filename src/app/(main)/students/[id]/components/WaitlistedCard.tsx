import { Card } from '@/components/ui/card';
import { AlertCircle } from 'lucide-react';

export default function WaitlistedCard() {
  return (
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
                <h4 className='text-lg font-semibold text-red-600 dark:text-red-400'>
                  Not Sponsored
                </h4>
                <div className='mt-3'>
                  <p className='text-sm text-neutral-700 dark:text-neutral-300'>
                    You have been placed on the NMDS sponsorship waiting list
                    based on your academic performance. NMDS sponsors a limited
                    number of students annually, and positions are highly
                    competitive.
                  </p>

                  <div className='mt-4 rounded-md bg-white/80 p-4 dark:bg-neutral-800/50'>
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
                          admission by the deadline, some slots may become
                          available to waitlisted students based strictly on
                          academic merit ranking. Please note that this
                          possibility is extremely limited and should not be
                          relied upon for your enrollment planning.
                        </span>
                      </li>
                      <li className='flex items-start gap-2'>
                        <Dot />
                        <span className='text-neutral-700 dark:text-neutral-300'>
                          The Registry Office will contact you directly by call
                          if a sponsorship opportunity becomes available.
                          Students are strongly advised to explore alternative
                          financing options rather than waiting for possible
                          NMDS sponsorship.
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
  );
}

function Dot() {
  return (
    <span className='flex size-5 shrink-0 items-center justify-center rounded-full bg-neutral-200 text-xs font-medium text-neutral-800 dark:bg-neutral-700 dark:text-neutral-200'>
      •
    </span>
  );
}
