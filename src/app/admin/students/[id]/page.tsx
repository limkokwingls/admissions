import {
  DetailsView,
  DetailsViewBody,
  DetailsViewHeader,
  FieldView,
} from '@/components/adease';
import { students } from '@/db/schema';
import { extractReference } from '@/lib/utils';
import { deleteStudent, getStudent } from '@/server/students/actions';
import { Badge, Box, Divider, Group, Text } from '@mantine/core';
import { notFound } from 'next/navigation';
import AcceptanceSwitch from './AcceptanceSwitch';

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
        title={extractReference(student)}
        queryKey={['students']}
        handleDelete={async () => {
          'use server';
          await deleteStudent(id);
        }}
      />
      <DetailsViewBody>
        <AcceptanceSwitch student={student} />
        <Box mt={'xl'}>
          <Group justify='space-between' align='center'>
            <Text>
              {student.surname} {student.names}
            </Text>
            <Badge variant='light' color={getBadgeColor(student.status)}>
              {student.status}
            </Badge>
          </Group>
          <Divider mt={5} />
        </Box>
        <FieldView label='Program'>{student.program?.name}</FieldView>
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
