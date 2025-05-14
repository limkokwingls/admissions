'use client';

import React, { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { getFaculties } from '@/server/faculties/actions';
import { getProgramsForFaculty } from '@/server/programs/actions';
import { Paper, Grid, Select, Button, Stack, Text } from '@mantine/core';

type Faculty = {
  id: number;
  code: string;
  name: string;
};

type Program = {
  id: number;
  facultyId: number;
  code: string;
  name: string;
};

export default function Filters() {
  const [facultyId, setFacultyId] = useQueryState('facultyId');
  const [programId, setProgramId] = useQueryState('programId');
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const [faculties, setFaculties] = React.useState<Faculty[]>([]);
  const [programs, setPrograms] = React.useState<Program[]>([]);

  useEffect(() => {
    const loadFaculties = async () => {
      const result = await getFaculties(1, '');
      if (result && result.items) {
        setFaculties(result.items);
      }
    };

    loadFaculties();
  }, []);

  useEffect(() => {
    const loadPrograms = async () => {
      if (facultyId) {
        const result = await getProgramsForFaculty(Number(facultyId));
        if (result && result.items) {
          setPrograms(result.items);
          setProgramId(null);
        }
      } else {
        setPrograms([]);
        setProgramId(null);
      }
    };

    loadPrograms();
  }, [facultyId, setProgramId]);

  const handleFacultyChange = (value: string | null) => {
    setFacultyId(value);
    setPage('1');
  };

  const handleProgramChange = (value: string | null) => {
    setProgramId(value);
    setPage('1');
  };

  const handleClearFilters = () => {
    setFacultyId(null);
    setProgramId(null);
    setPage('1');
  };

  return (
    <Paper shadow='xs' p='md' mb='md'>
      <Grid>
        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Faculty
            </Text>
            <Select
              placeholder='Select Faculty'
              data={[
                { value: '', label: 'All Faculties' },
                ...faculties.map((faculty) => ({
                  value: String(faculty.id),
                  label: faculty.name,
                })),
              ]}
              value={facultyId || ''}
              onChange={handleFacultyChange}
              searchable
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 4 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Program
            </Text>
            <Select
              placeholder='All Programs'
              data={[
                { value: '', label: 'All Programs' },
                ...programs.map((program) => ({
                  value: String(program.id),
                  label: program.name,
                })),
              ]}
              value={programId || ''}
              onChange={handleProgramChange}
              searchable
              clearable
            />
          </Stack>
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 4 }}
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
