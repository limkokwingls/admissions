'use client';

import React, { useEffect } from 'react';
import { useQueryState } from 'nuqs';
import { getFaculties } from '@/server/faculties/actions';
import { getProgramsForFaculty } from '@/server/programs/actions';
import {
  Paper,
  Grid,
  Select,
  TextInput,
  Button,
  Group,
  Stack,
  Text,
} from '@mantine/core';

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
  const [search, setSearch] = useQueryState('search', { defaultValue: '' });
  const [page, setPage] = useQueryState('page', { defaultValue: '1' });

  const [faculties, setFaculties] = React.useState<Faculty[]>([]);
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [searchInput, setSearchInput] = React.useState(search || '');

  useEffect(() => {
    const loadFaculties = async () => {
      const result = await getFaculties(1, '');
      if (result && result.items) {
        setFaculties(result.items);

        if (!facultyId && result.items.length > 0) {
          setFacultyId(String(result.items[0].id));
        }
      }
    };

    loadFaculties();
  }, [facultyId, setFacultyId]);

  useEffect(() => {
    const loadPrograms = async () => {
      if (facultyId) {
        const result = await getProgramsForFaculty(Number(facultyId));
        if (result && result.items) {
          setPrograms(result.items);
          setProgramId(null);
        }
      }
    };

    loadPrograms();
  }, [facultyId, setProgramId]);

  const handleSearch = () => {
    setSearch(searchInput);
    setPage('1');
  };

  const handleFacultyChange = (value: string | null) => {
    if (value) {
      setFacultyId(value);
      setPage('1');
    }
  };

  const handleProgramChange = (value: string | null) => {
    setProgramId(value);
    setPage('1');
  };

  const handleClearFilters = () => {
    setProgramId(null);
    setSearch('');
    setSearchInput('');
    setPage('1');
  };

  return (
    <Paper shadow='xs' p='md' mb='md'>
      <Grid>
        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Faculty
            </Text>
            <Select
              placeholder='Select Faculty'
              data={faculties.map((faculty) => ({
                value: String(faculty.id),
                label: faculty.name,
              }))}
              value={facultyId || null}
              onChange={handleFacultyChange}
              searchable
              clearable={false}
            />
          </Stack>
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
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

        <Grid.Col span={{ base: 12, md: 3 }}>
          <Stack gap='xs'>
            <Text size='sm' fw={500}>
              Search
            </Text>
            <Group grow>
              <TextInput
                placeholder='Search by name, candidate no, phone...'
                value={searchInput}
                onChange={(e) => setSearchInput(e.currentTarget.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
              <Button onClick={handleSearch} style={{ flexShrink: 0 }}>
                Search
              </Button>
            </Group>
          </Stack>
        </Grid.Col>

        <Grid.Col
          span={{ base: 12, md: 3 }}
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
