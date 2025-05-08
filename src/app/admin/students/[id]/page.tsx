import {
  DetailsView,
  DetailsViewBody,
  DetailsViewHeader,
  FieldView,
} from '@/components/adease';
import { students } from '@/db/schema';
import { extractReference } from '@/lib/utils';
import { deleteStudent, getStudent } from '@/server/students/actions';
import { getPageVisitByStudentId, getLetterDownloadByStudentId } from '@/server/analytics/actions';
import { Badge, Box, Divider, Group, SimpleGrid, Text, Card, Title } from '@mantine/core';
import { notFound } from 'next/navigation';
import AcceptanceSwitch from './AcceptanceSwitch';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  params: Promise<{ id: string }>;
};

type Student = typeof students.$inferSelect;

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  const pageVisit = await getPageVisitByStudentId(student?.id || '');
  const letterDownload = await getLetterDownloadByStudentId(student?.id || '');

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
      <DetailsViewBody gap={'lg'}>
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
        <SimpleGrid cols={2}>
          <FieldView label='Phone Number'>{student.phoneNumber}</FieldView>
          <FieldView label='Candidate No'>{student.candidateNo}</FieldView>
        </SimpleGrid>
        
        <Box mt="xl">
          <Title order={4} mb="md">Analytics</Title>
          <SimpleGrid cols={2} spacing="md">
            <Card withBorder padding="md" radius="md">
              <Title order={5} mb="xs">Page Visits</Title>
              <Text size="lg" fw={700} mb="xs">
                {pageVisit?.visitCount || 0}
              </Text>
              {pageVisit?.lastVisitedAt && (
                <Text size="sm" c="dimmed">
                  Last visited: {formatDistanceToNow(new Date(pageVisit.lastVisitedAt), { addSuffix: true })}
                </Text>
              )}
            </Card>
            
            <Card withBorder padding="md" radius="md">
              <Title order={5} mb="xs">Acceptance Letter Downloads</Title>
              <Text size="lg" fw={700} mb="xs">
                {letterDownload?.downloadCount || 0}
              </Text>
              {letterDownload?.lastDownloadedAt && (
                <Text size="sm" c="dimmed">
                  Last downloaded: {formatDistanceToNow(new Date(letterDownload.lastDownloadedAt), { addSuffix: true })}
                </Text>
              )}
            </Card>
          </SimpleGrid>
        </Box>
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
