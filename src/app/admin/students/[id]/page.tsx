import {
  DetailsView,
  DetailsViewBody,
  DetailsViewHeader,
  FieldView,
} from '@/components/adease';
import { students } from '@/db/schema';
import { extractReference } from '@/lib/utils';
import { deleteStudent, getStudent } from '@/server/students/actions';
import {
  getPageVisitByStudentId,
  getLetterDownloadByStudentId,
} from '@/server/analytics/actions';
import {
  Badge,
  Box,
  Divider,
  Group,
  SimpleGrid,
  Text,
  Card,
  Title,
  Paper,
  Flex,
  ThemeIcon,
} from '@mantine/core';
import { notFound } from 'next/navigation';
import AcceptanceSwitch from './AcceptanceSwitch';
import { formatDistanceToNow } from 'date-fns';
import { IconEye, IconFileDownload } from '@tabler/icons-react';
import PrintAdmission from './edit/PrintAdmission';
import { getCurrentProperties } from '@/server/properties/actions';

type Props = {
  params: Promise<{ id: string }>;
};

type Student = typeof students.$inferSelect;

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  const pageVisit = await getPageVisitByStudentId(student?.id || '');
  const letterDownload = await getLetterDownloadByStudentId(student?.id || '');
  const properties = await getCurrentProperties();

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
        actions={[
          <PrintAdmission
            key='print'
            student={student}
            properties={properties}
          />,
        ]}
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

        <Paper withBorder p='md' radius='md' shadow='xs' mt='xl'>
          <Title order={5} mb='md' c='dimmed' size='sm'>
            Analytics
          </Title>
          <SimpleGrid cols={2}>
            <Box>
              <Group gap='xs'>
                <Text size='sm' fw={500}>
                  Page Visits
                </Text>
              </Group>
              <Group mt={4}>
                <Text size='sm' fw={700}>
                  {pageVisit?.visitCount || 0}
                </Text>
                {pageVisit?.lastVisitedAt && (
                  <Text size='xs' c='dimmed'>
                    Last:{' '}
                    {formatDistanceToNow(new Date(pageVisit.lastVisitedAt), {
                      addSuffix: true,
                    })}
                  </Text>
                )}
              </Group>
            </Box>

            <Box>
              <Group gap='xs'>
                <Text size='sm' fw={500}>
                  Letter Downloads
                </Text>
              </Group>
              <Group mt={4}>
                <Text size='sm' fw={700}>
                  {letterDownload?.downloadCount || 0}
                </Text>
                {letterDownload?.lastDownloadedAt && (
                  <Text size='xs' c='dimmed'>
                    Last:{' '}
                    {formatDistanceToNow(
                      new Date(letterDownload.lastDownloadedAt),
                      {
                        addSuffix: true,
                      },
                    )}
                  </Text>
                )}
              </Group>
            </Box>
          </SimpleGrid>
        </Paper>
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
