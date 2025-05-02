import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getStudent, deleteStudent } from '@/server/students/actions';
import { Divider, Fieldset, Group } from '@mantine/core';
import { Badge } from '@mantine/core';
import { Text } from '@mantine/core';
import { students } from '@/db/schema';

type Props = {
  params: Promise<{ id: string }>;
};

type Student = typeof students.$inferSelect;

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);

  if (!student) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={'Student'}
        queryKey={['students']}
        handleDelete={async () => {
          'use server';
          await deleteStudent(id);
        }}
      />
      <DetailsViewBody>
        <Group justify='space-between' align='center'>
          <Text fw={'bold'}>{student.no}</Text>
          <Badge variant='outline' color={getBadgeColor(student.status)}>
            {student.status}
          </Badge>
        </Group>
        <Divider />
        <FieldView label='Names'>
          {student.surname} {student.names}
        </FieldView>
        <Fieldset legend='Program'>
          <Text size='sm'>{student.program?.name}</Text>
        </Fieldset>
        <FieldView label='Phone Number'>{student.phoneNumber}</FieldView>
        <FieldView label='Candidate No'>{student.candidateNo}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}

function getBadgeColor(status: Student['status']) {
  switch (status) {
    case 'Admitted':
      return 'green';
    case 'Wait Listed':
      return 'yellow';
    case 'DQ':
      return 'red';
    default:
      return 'gray';
  }
}
