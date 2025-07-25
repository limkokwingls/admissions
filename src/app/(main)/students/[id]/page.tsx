import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { getCallsByStudentId } from '@/server/calls/actions';
import { incrementPageVisit } from '@/server/analytics/actions';
import { Container } from '@/components/ui/container';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import ProgramCard from '@/app/(main)/students/[id]/components/ProgramCard';
import Header from './header';
import WaitlistedCard from './components/WaitlistedCard';
import SponsoredCard from './components/SponsoredCard';
import { Info } from 'lucide-react';

type Props = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const student = await getStudent(id);

  if (!student) {
    return {
      title: 'Student Not Found',
      description: 'The requested student information could not be found.',
    };
  }

  return {
    title: `${student.surname} ${student.names} | Limkokwing University`,
    description: `View admission details for ${student.surname} ${student.names}, Candidate No: ${student.candidateNo}.`,
  };
}

export default async function StudentPage({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  const properties = await getCurrentProperties();
  const calls = await getCallsByStudentId(id);

  if (!student) {
    return notFound();
  }

  await incrementPageVisit(student.id);

  const hasAcceptedCall = calls.some((call) => call.status === 'accepted');
  const isAdmitted = student.status === 'Admitted' || hasAcceptedCall;
  const isWaitlisted = student.status === 'Wait Listed';

  if (!properties) {
    return notFound();
  }

  return (
    <div className='min-h-screen bg-neutral-50 dark:bg-neutral-950'>
      <Header student={student} calls={calls} />
      <Container width='xl'>
        <div className='mx-auto max-w-4xl py-8 pb-12'>
          <ProgramCard student={student} calls={calls} />
          <div className='mt-6 flex flex-col gap-2'>
            {isWaitlisted && !isAdmitted && (
              <WaitlistedCard student={student} properties={properties} />
            )}
            {isAdmitted && (
              <SponsoredCard
                student={student}
                properties={properties}
                calls={calls}
              />
            )}

            <div className='mt-6 rounded-lg border border-neutral-200 bg-neutral-50 p-4 dark:border-neutral-700 dark:bg-neutral-800/50'>
              <div className='flex items-start gap-3'>
                <div className='mt-0.5 rounded-full bg-neutral-200 p-1.5 text-neutral-700 dark:bg-neutral-700 dark:text-neutral-300'>
                  <Info className='h-4 w-4' />
                </div>
                <div>
                  <h4 className='text-sm font-medium text-neutral-700 dark:text-neutral-300'>
                    Disclaimer
                  </h4>
                  <p className='mt-2 text-sm text-neutral-600 dark:text-neutral-400'>
                    Limkokwing University of Creative Technology does not bear
                    any duty or responsibility for the sponsorship or
                    non-sponsorship of any student. Sponsorship decisions are
                    made independently by the National Manpower Development
                    Secretariat (NMDS) based on their own criteria and available
                    resources.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
