import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { Container } from '@/components/ui/container';
import { notFound } from 'next/navigation';
import ProgramCard from '@/app/(main)/students/[id]/components/ProgramCard';
import Header from './header';
import WaitlistedCard from './components/WaitlistedCard';
import SponsoredCard from './components/SponsoredCard';

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
            {isWaitlisted && <WaitlistedCard />}
            {isAdmitted && (
              <SponsoredCard student={student} properties={properties} />
            )}
          </div>
        </div>
      </Container>
    </div>
  );
}
