'use client';

import { getFaculties } from '@/server/faculties/actions';
import {
  getAllPrograms,
  getProgramsForFaculty,
} from '@/server/programs/actions';
import { Button, Grid, Paper, Select, Stack, Text } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { parseAsInteger, useQueryState } from 'nuqs';
import React from 'react';

type Faculty = NonNullable<
  Awaited<ReturnType<typeof getFaculties>>
>['items'][number];
type Program = NonNullable<
  Awaited<ReturnType<typeof getProgramsForFaculty>>
>['items'][number];

export default function Filters() {
  const [facultyId, setFacultyId] = useQueryState('facultyId');
  const [programId, setProgramId] = useQueryState('programId');
  const [registered, setRegistered] = useQueryState('registered');
  const [status, setStatus] = useQueryState('status');

  const [, setPage] = useQueryState<number>(
    'page',
    parseAsInteger.withDefault(1),
  );

  const { data: facultiesData } = useQuery({
    queryKey: ['faculties'],
    queryFn: () => getFaculties(1, ''),
  });

  const { data: programsData } = useQuery({
    queryKey: ['programs', facultyId],
    queryFn: () =>
      facultyId ? getProgramsForFaculty(Number(facultyId)) : getAllPrograms(),
    enabled: !!facultyId,
  });

  React.useEffect(() => {
    if (!facultyId) {
      setProgramId(null);
    }
  }, [facultyId, setProgramId]);

  const handleFacultyChange = (value: string | null) => {
    setFacultyId(value);
    setPage(1);
  };

  const handleProgramChange = (value: string | null) => {
    setProgramId(value);
    setPage(1);
  };

  const handleRegisteredChange = (value: string | null) => {
    setRegistered(value);
    setPage(1);
  };

  const handleStatusChange = (value: string | null) => {
    setStatus(value);
    setPage(1);
  };

  const handleClearFilters = () => {
    setFacultyId(null);
    setProgramId(null);
    setRegistered(null);
    setStatus(null);
    setPage(1);
  };

  return (
    <Paper shadow='xs' p='md' mb='md'>
      <Grid>
        <Grid.Col span={{ base: 12, md: 2.4 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Faculty
            </Text>
            <Select
              placeholder='Select Faculty'
              data={[
                { value: '', label: 'All Faculties' },
                ...((facultiesData?.items ?? []) as Faculty[]).map(
                  (faculty) => ({
                    value: String(faculty.id),
                    label: faculty.name,
                  }),
                ),
              ]}
              value={facultyId || ''}
              onChange={handleFacultyChange}
              searchable
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 2.4 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Program
            </Text>
            <Select
              placeholder='All Programs'
              data={[
                { value: '', label: 'All Programs' },
                ...((programsData?.items ?? []) as Program[]).map(
                  (program) => ({
                    value: String(program.id),
                    label: program.name,
                  }),
                ),
              ]}
              value={programId || ''}
              onChange={handleProgramChange}
              searchable
              clearable
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 2.4 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Registration Status
            </Text>
            <Select
              placeholder='All Students'
              data={[
                { value: '', label: 'All Students' },
                { value: 'registered', label: 'Registered Only' },
                { value: 'unregistered', label: 'Unregistered Only' },
              ]}
              value={registered || ''}
              onChange={handleRegisteredChange}
              clearable
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 2.4 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Student Status
            </Text>
            <Select
              placeholder='All Statuses'
              data={[
                { value: '', label: 'All Statuses' },
                { value: 'Admitted', label: 'Admitted' },
                { value: 'Wait Listed', label: 'Wait Listed' },
                { value: 'Sponsored', label: 'Sponsored' },
                { value: 'Private', label: 'Private' },
                { value: 'DQ', label: 'DQ' },
              ]}
              value={status || ''}
              onChange={handleStatusChange}
              clearable
            />
          </Stack>
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 2.4 }}
          style={{ display: 'flex', alignItems: 'flex-end' }}
        >
          <Button
            variant='outline'
            onClick={handleClearFilters}
            ml='auto'
            mt={{ base: 'xs', md: 'lg' }}
          >
            Clear Filters
          </Button>
        </Grid.Col>
      </Grid>
    </Paper>
  );
}
