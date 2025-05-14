'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useQueryState } from 'nuqs';
import {
  Table,
  TextInput,
  Select,
  Group,
  Text,
  Pagination,
  Paper,
  Badge,
  rem,
} from '@mantine/core';
import { IconSearch, IconFilter } from '@tabler/icons-react';

type Student = {
  id: string;
  no: number;
  surname: string;
  names: string;
  candidateNo: string | null;
  phoneNumber: string;
  status: string;
  receiptNo: string | null;
  program: {
    id: number;
    name: string;
  } | null;
};

type Program = {
  id: number;
  name: string;
  code: string;
};

type PaginationMeta = {
  page: number;
  size: number;
  total: number;
  totalPages: number;
};

type AcceptedStudentsTableProps = {
  students: Student[];
  programs: Program[];
  meta: PaginationMeta;
  facultyId: number;
};

export function AcceptedStudentsTable({
  students,
  programs,
  meta,
  facultyId,
}: AcceptedStudentsTableProps) {
  const pathname = usePathname();

  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const [programId, setProgramId] = useQueryState('programId');
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const handleSearch = () => {
    setPage('1');
  };

  const handleProgramChange = (value: string | null) => {
    setProgramId(value);
    setPage('1');
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage.toString());
  };

  const programOptions = [
    { value: '', label: 'All Programs' },
    ...programs.map((program) => ({
      value: program.id.toString(),
      label: `${program.code} - ${program.name}`,
    })),
  ];

  return (
    <Paper shadow='xs' p='md' withBorder>
      <Group justify='space-between' mb='md'>
        <Group>
          <TextInput
            placeholder='Search by name, candidate no, phone, receipt no...'
            value={search}
            onChange={(e) => setSearch(e.currentTarget.value)}
            leftSection={<IconSearch size={16} />}
            style={{ width: '350px' }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSearch();
            }}
          />
          <Select
            placeholder='Filter by Program'
            data={programOptions}
            value={programId}
            onChange={handleProgramChange}
            leftSection={<IconFilter size={16} />}
            style={{ width: '300px' }}
            clearable
          />
        </Group>
      </Group>

      <Table striped highlightOnHover>
        <thead>
          <tr>
            <th>No</th>
            <th>Surname</th>
            <th>Names</th>
            <th>Candidate No</th>
            <th>Phone Number</th>
            <th>Status</th>
            <th>Receipt No</th>
            <th>Program</th>
          </tr>
        </thead>
        <tbody>
          {students.length === 0 ? (
            <tr>
              <td colSpan={8}>
                <Text ta='center' c='dimmed' py='lg'>
                  No accepted students found
                </Text>
              </td>
            </tr>
          ) : (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.no}</td>
                <td>{student.surname}</td>
                <td>{student.names}</td>
                <td>{student.candidateNo || '-'}</td>
                <td>{student.phoneNumber}</td>
                <td>
                  <Badge
                    color={student.status === 'Admitted' ? 'green' : 'blue'}
                  >
                    {student.status}
                  </Badge>
                </td>
                <td>{student.receiptNo || '-'}</td>
                <td>{student.program?.name || '-'}</td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {meta.totalPages > 1 && (
        <Group justify='center' mt='md'>
          <Pagination
            total={meta.totalPages}
            value={parseInt(page)}
            onChange={handlePageChange}
            withEdges
          />
          <Text size='sm' color='dimmed'>
            Showing {students.length} of {meta.total} records
          </Text>
        </Group>
      )}
    </Paper>
  );
}
