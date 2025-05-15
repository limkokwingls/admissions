'use client';

import React from 'react';
import { useQueryState } from 'nuqs';
import { getAcceptedStudentsByFaculty } from '@/server/students/actions';
import {
  Table,
  Paper,
  Text,
  Group,
  Badge,
  Pagination,
  Skeleton,
  Center,
  Stack,
  Alert,
  Title,
  Divider,
  Anchor,
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { formatNames } from '@/lib/utils';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { students } from '@/db/schema';

type StudentStatus = (typeof students.$inferSelect)['status'];

export default function CollectionsTable() {
  const [facultyId] = useQueryState('facultyId');
  const [programId] = useQueryState('programId');
  const [search] = useQueryState('search', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const { data, isLoading, error } = useQuery({
    queryKey: ['acceptedStudents', facultyId, programId, page, search],
    queryFn: async () => {
      return getAcceptedStudentsByFaculty(
        facultyId ? Number(facultyId) : undefined,
        programId ? Number(programId) : undefined,
        Number(page),
      );
    },
  });

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  const getStatusColor = (status: StudentStatus) => {
    switch (status) {
      case 'Admitted':
        return 'green';
      case 'Wait Listed':
        return 'yellow';
      case 'DQ':
        return 'red';
      default:
        return 'blue';
    }
  };

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title='Error' color='red'>
        Failed to load students. Please try again.
      </Alert>
    );
  }

  return (
    <Paper shadow='xs' p='md'>
      <Group justify='space-between' mb='md'>
        <Title order={4}>Accepted Students</Title>
        <Text size='sm' fw={500}>
          Total Records: {data?.totalItems || 0}
        </Text>
      </Group>
      <Divider mb='md' />

      {isLoading ? (
        <Stack>
          <Skeleton height={40} radius='sm' />
          <Skeleton height={40} radius='sm' />
          <Skeleton height={40} radius='sm' />
          <Skeleton height={40} radius='sm' />
          <Skeleton height={40} radius='sm' />
        </Stack>
      ) : data?.items.length === 0 ? (
        <Center p='xl'>
          <Text c='dimmed'>No students found matching the criteria.</Text>
        </Center>
      ) : (
        <>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Names</Table.Th>
                <Table.Th>Program</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Receipt No</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {data?.items.map((student) => (
                <Table.Tr key={student.id}>
                  <Table.Td>{student.no}</Table.Td>
                  <Table.Td>
                    <Anchor
                      size='sm'
                      component={Link}
                      href={`/admin/students/${student.id}`}
                    >
                      {formatNames(student.surname)}{' '}
                      {formatNames(student.names)}
                    </Anchor>
                  </Table.Td>
                  <Table.Td>{student.program.name || '-'}</Table.Td>
                  <Table.Td>
                    <Badge
                      variant='light'
                      size='xs'
                      color={getStatusColor(student.status)}
                    >
                      {student.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{student.receiptNo || '-'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {data?.totalPages && data.totalPages > 1 && (
            <Paper withBorder mt='xl' p='xs'>
              <Group justify='center'>
                <Pagination
                  total={data.totalPages}
                  value={Number(page)}
                  size={'sm'}
                  onChange={handlePageChange}
                />
              </Group>
            </Paper>
          )}
        </>
      )}
    </Paper>
  );
}
