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
} from '@nextui-org/react';

type Props = {
  students: Student[];
};

export default function StudentsTable({ students }: Props) {
  const items = students
    .map((student) => ({
      no: Number(student.position),
      names: formatNames(student.names, student.surname),
      status: student.status,
    }))
    .sort((a, b) => a.no - b.no);

  return (
    <Table aria-label='Example table with dynamic content'>
      <TableHeader>
        <TableColumn key='no'>No.</TableColumn>
        <TableColumn key='names'>Role</TableColumn>
        <TableColumn key='status'>Status</TableColumn>
      </TableHeader>
      <TableBody items={items}>
        {(item) => (
          <TableRow key={item.no}>
            {(columnKey) => (
              <TableCell>{getKeyValue(item, columnKey)}</TableCell>
            )}
          </TableRow>
        )}
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
