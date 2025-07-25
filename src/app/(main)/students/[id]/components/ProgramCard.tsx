import { Card } from '@/components/ui/card';
import { getStudent } from '@/server/students/actions';
import { getCallsByStudentId } from '@/server/calls/actions';
import { GraduationCap, Calendar } from 'lucide-react';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  calls: Awaited<ReturnType<typeof getCallsByStudentId>>;
};

export default function ProgramCard({ student, calls }: Props) {
  const { program } = student;
  const hasAcceptedCall = calls.some((call) => call.status === 'accepted');
  const isAdmitted = student.status === 'Admitted' || hasAcceptedCall;
  const isWaitlisted = student.status === 'Wait Listed';

  const isProgramAdmitted = isAdmitted || (isWaitlisted && !hasAcceptedCall);

  return (
    <Card className='overflow-hidden border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900'>
      <div className='p-6'>
        <div className='flex items-center gap-6'>
          <div className='hidden h-12 w-12 items-center justify-center rounded-full bg-neutral-100 dark:bg-neutral-800 md:flex'>
            <GraduationCap className='h-6 w-6 text-neutral-700 dark:text-neutral-300' />
          </div>

          <div className='flex-1'>
            <h2 className='text-lg font-bold text-neutral-900 dark:text-white'>
              {program?.name || 'Program information unavailable'}
            </h2>
            <p className='mt-1 text-neutral-600 dark:text-neutral-400'>
              {program?.faculty?.name}
            </p>
            <div className='mt-2 flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400'>
              <Calendar className='h-4 w-4' />
              <span>{student.semester}</span>
            </div>
          </div>
        </div>

        <div className='mt-4 border-t border-neutral-100 pt-3 dark:border-neutral-800'>
          {isProgramAdmitted ? (
            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
              <span className='font-medium text-emerald-600 dark:text-emerald-400'>
                Congratulations!
              </span>{' '}
              You have been admitted to study {program?.name} at Limkokwing
              University of Creative Technology Lesotho.{' '}
              {isWaitlisted && !hasAcceptedCall
                ? 'Unfortunately, you have not secured NMDS sponsorship.'
                : 'Your education will be fully sponsored by NMDS.'}
            </p>
          ) : (
            <p className='text-sm text-neutral-700 dark:text-neutral-300'>
              <span className='font-medium text-red-600 dark:text-red-400'>
                Notice:
              </span>{' '}
              We regret to inform you that your application to study{' '}
              {program?.name} at Limkokwing University of Creative Technology
              Lesotho was not successful.
            </p>
          )}
        </div>
      </div>
    </Card>
  );
}
