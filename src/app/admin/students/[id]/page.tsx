import { DetailsView, DetailsViewHeader } from '@/components/adease';
import { extractReference } from '@/lib/utils';
import { deleteStudent, getStudent } from '@/server/students/actions';
import { Tabs, TabsList, TabsPanel, TabsTab } from '@mantine/core';
import { notFound } from 'next/navigation';
import AcceptanceDetails from './AcceptanceDetails';
import StudentInfo from './StudentInfo';
import { getCallsByStudentId } from '@/server/calls/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  const calls = await getCallsByStudentId(id);

  if (!student) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={extractReference(student)}
        queryKey={['students']}
        handleDelete={async () => {
          'use server';
          await deleteStudent(id);
        }}
      />

      <Tabs defaultValue='acceptance'>
        <TabsList>
          <TabsTab value='acceptance'>Acceptance</TabsTab>
          <TabsTab value='info'>Personal Info</TabsTab>
        </TabsList>
        <TabsPanel value='acceptance'>
          <AcceptanceDetails student={student} calls={calls} />
        </TabsPanel>
        <TabsPanel value='info'>
          <StudentInfo student={student} />
        </TabsPanel>
      </Tabs>
    </DetailsView>
  );
}
