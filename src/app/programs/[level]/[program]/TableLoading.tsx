'use client';
import {
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from '@nextui-org/react';
import React from 'react';

export default function TableLoading() {
  return (
    <Table aria-label='Example static collection table'>
      <TableHeader>
        <TableColumn>No.</TableColumn>
        <TableColumn>Role</TableColumn>
        <TableColumn>Status</TableColumn>
      </TableHeader>
      <TableBody
        isLoading={true}
        loadingContent={<Spinner label='Loading...' />}
      >
        <TableRow>
          <TableCell> </TableCell>
          <TableCell> </TableCell>
          <TableCell> </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
