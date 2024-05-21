'use client';
import React from 'react';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Chip,
} from '@nextui-org/react';
import { formatProgramName } from '@/lib/format';

type Props = {
  students: Student[];
  showProgram?: boolean;
};

export default function StudentsTable({ students, showProgram }: Props) {
  const items = students.map((student) => ({
    no: Number(student.position),
    names: formatNames(student.names, student.surname),
    status: student.status,
    program: formatProgramName(student.programName),
  }));

  return (
    <Table aria-label='Example table with dynamic content'>
      <TableHeader>
        <TableColumn key='no'>No.</TableColumn>
        <TableColumn key='names'>Role</TableColumn>
        <TableColumn key='status'>Status</TableColumn>
      </TableHeader>
      <TableBody>
        {items.map((item) => (
          <TableRow key={getKeyValue(item, 'no')}>
            <TableCell>{item.no}</TableCell>
            <TableCell>
              {showProgram ? (
                <div className='flex flex-col'>
                  <p className='text-bold text-sm capitalize'>{item.names}</p>
                  <p className='text-bold text-sm capitalize text-default-400'>
                    {item.program}
                  </p>
                </div>
              ) : (
                item.names
              )}
            </TableCell>
            <TableCell>
              <Chip
                className='capitalize'
                color={
                  item.status.toLowerCase() === 'admitted'
                    ? 'success'
                    : 'danger'
                }
                size='sm'
                variant='flat'
              >
                {item.status.toLowerCase()}
              </Chip>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

// Combine names and convert it to title case
function formatNames(names: string, surname: string): string {
  return `${names} ${surname}`
    .toLowerCase()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}
