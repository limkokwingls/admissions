'use client';

import React, { useEffect, useState } from 'react';
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
  Divider
} from '@mantine/core';
import { IconAlertCircle } from '@tabler/icons-react';
import { formatNames } from '@/lib/utils';

type Student = NonNullable<Awaited<ReturnType<typeof getAcceptedStudentsByFaculty>>>['data'][0];

export default function CollectionsTable() {
  const [facultyId] = useQueryState('facultyId');
  const [programId] = useQueryState('programId');
  const [search] = useQueryState('search', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });
  
  const [students, setStudents] = useState<Student[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStudents = async () => {
      if (!facultyId) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const result = await getAcceptedStudentsByFaculty(
          Number(facultyId),
          programId ? Number(programId) : undefined,
          Number(page),
          search || ''
        );
        
        setStudents(result.data || []);
        setTotalPages(result.meta.totalPages);
        setTotalRecords(result.meta.total);
      } catch (err) {
        console.error('Error fetching students:', err);
        setError('Failed to load students. Please try again.');
        setStudents([]);
      } finally {
        setLoading(false);
      }
    };
    
    fetchStudents();
  }, [facultyId, programId, page, search]);

  const handlePageChange = (newPage: number) => {
    setPage(String(newPage));
  };

  // Status badge color based on status
  const getStatusColor = (status: string) => {
    switch (status.toUpperCase()) {
      case 'ACCEPTED':
        return 'green';
      case 'PENDING':
        return 'yellow';
      case 'REJECTED':
        return 'red';
      case 'DQ':
        return 'gray';
      default:
        return 'blue';
    }
  };

  if (error) {
    return (
      <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
        {error}
      </Alert>
    );
  }

  return (
    <Paper shadow="xs" p="md">
      <Group justify="space-between" mb="md">
        <Title order={4}>Accepted Students</Title>
        <Text size="sm" fw={500}>
          Total Records: {totalRecords}
        </Text>
      </Group>
      <Divider mb="md" />

      {loading ? (
        <Stack>
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
          <Skeleton height={40} radius="sm" />
        </Stack>
      ) : students.length === 0 ? (
        <Center p="xl">
          <Text c="dimmed">No students found matching the criteria.</Text>
        </Center>
      ) : (
        <>
          <Table striped highlightOnHover>
            <Table.Thead>
              <Table.Tr>
                <Table.Th>No</Table.Th>
                <Table.Th>Surname</Table.Th>
                <Table.Th>Names</Table.Th>
                <Table.Th>Candidate No</Table.Th>
                <Table.Th>Phone Number</Table.Th>
                <Table.Th>Status</Table.Th>
                <Table.Th>Receipt No</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {students.map((student) => (
                <Table.Tr key={student.id}>
                  <Table.Td>{student.no}</Table.Td>
                  <Table.Td>{formatNames(student.surname)}</Table.Td>
                  <Table.Td>{formatNames(student.names)}</Table.Td>
                  <Table.Td>{student.candidateNo || '-'}</Table.Td>
                  <Table.Td>{student.phoneNumber || '-'}</Table.Td>
                  <Table.Td>
                    <Badge color={getStatusColor(student.status)}>
                      {student.status}
                    </Badge>
                  </Table.Td>
                  <Table.Td>{student.receiptNo || '-'}</Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>

          {totalPages > 1 && (
            <Group justify="center" mt="xl">
              <Pagination 
                total={totalPages} 
                value={Number(page)} 
                onChange={handlePageChange} 
              />
            </Group>
          )}
        </>
      )}
    </Paper>
  );
}
