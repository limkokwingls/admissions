'use client';

import { programLevels, programs as programsTable } from '@/db/schema';
import {
  createProgram,
  deleteProgram,
  getProgramsForFaculty,
  updateProgram,
} from '@/server/programs/actions';
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Modal,
  NumberInput,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconEdit, IconPlus, IconTrash } from '@tabler/icons-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { capitalCase } from 'change-case';

type Program = typeof programsTable.$inferInsert;

type Props = {
  facultyId: number;
};

export default function ProgramsManager({ facultyId }: Props) {
  const [modalOpened, setModalOpened] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const queryClient = useQueryClient();

  const { data: programsData } = useQuery({
    queryKey: ['programs', facultyId],
    queryFn: () => getProgramsForFaculty(facultyId),
  });

  const programs = programsData?.items || [];

  const form = useForm<Program>({
    validate: {
      id: (value) => (value ? null : 'ID is required'),
      code: (value) => (value ? null : 'Code is required'),
      name: (value) => (value ? null : 'Name is required'),
      level: (value) => (value ? null : 'Level is required'),
      facultyId: (value) => (value ? null : 'Faculty ID is required'),
    },
  });

  const createMutation = useMutation({
    mutationFn: createProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs', facultyId] });
      handleCloseModal();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, program }: { id: number; program: Program }) =>
      updateProgram(id, program),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs', facultyId] });
      handleCloseModal();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteProgram,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['programs', facultyId] });
    },
  });

  const handleOpenModal = (program?: Program) => {
    if (program) {
      setEditingProgram(program);
      form.setValues({
        id: program.id,
        structureId: program.structureId,
        code: program.code,
        name: program.name,
        facultyId: program.facultyId,
        level: program.level,
      });
    } else {
      setEditingProgram(null);
      form.reset();
      form.setFieldValue('facultyId', facultyId);
    }
    setModalOpened(true);
  };

  const handleCloseModal = () => {
    setModalOpened(false);
    setEditingProgram(null);
    form.reset();
  };

  const handleSubmit = (values: Program) => {
    if (editingProgram?.id) {
      updateMutation.mutate({ id: editingProgram.id, program: values });
    } else {
      createMutation.mutate(values);
    }
  };

  const handleDelete = (id: number) => {
    if (confirm('Are you sure you want to delete this program?')) {
      deleteMutation.mutate(id);
    }
  };

  return (
    <Box mt='xl'>
      <Group justify='space-between' mb='md'>
        <Text size='lg' fw={600}>
          Programs
        </Text>
        <Button
          variant='light'
          leftSection={<IconPlus size={16} />}
          onClick={() => handleOpenModal()}
        >
          Program
        </Button>
      </Group>

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Structure ID</Table.Th>
            <Table.Th>Code</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th>Level</Table.Th>
            <Table.Th style={{ width: 120 }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {programs.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={5} align='center'>
                <Text c='dimmed'>No programs found</Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            programs.map(
              (program: {
                id: number;
                structureId: number | null;
                code: string;
                name: string;
                facultyId: number;
                level: (typeof programLevels)[number];
              }) => (
                <Table.Tr key={program.id}>
                  <Table.Td>{program.id}</Table.Td>
                  <Table.Td>{program.structureId || '-'}</Table.Td>
                  <Table.Td>{program.code}</Table.Td>
                  <Table.Td>{program.name}</Table.Td>
                  <Table.Td>
                    <Text size='sm' tt='capitalize'>
                      {program.level}
                    </Text>
                  </Table.Td>
                  <Table.Td>
                    <Group gap='xs'>
                      <ActionIcon
                        variant='subtle'
                        color='blue'
                        onClick={() => handleOpenModal(program)}
                      >
                        <IconEdit size={16} />
                      </ActionIcon>
                      <ActionIcon
                        variant='subtle'
                        color='red'
                        onClick={() => handleDelete(program.id)}
                      >
                        <IconTrash size={16} />
                      </ActionIcon>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ),
            )
          )}
        </Table.Tbody>
      </Table>

      <Modal
        opened={modalOpened}
        onClose={handleCloseModal}
        title={editingProgram ? 'Edit Program' : 'Add Program'}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <NumberInput
              label='ID'
              placeholder='Enter program ID'
              required
              {...form.getInputProps('id')}
              readOnly={!!editingProgram}
              disabled={!!editingProgram}
            />
            <NumberInput
              label='Structure ID'
              placeholder='Enter structure ID'
              {...form.getInputProps('structureId')}
            />
            <TextInput
              label='Code'
              placeholder='Enter program code'
              required
              {...form.getInputProps('code')}
            />
            <TextInput
              label='Name'
              placeholder='Enter program name'
              required
              {...form.getInputProps('name')}
              onChange={(event) => {
                const newName = event.currentTarget.value;
                form.getInputProps('name').onChange(newName);

                let level: Program['level'] = 'degree';
                if (newName.toLowerCase().startsWith('diploma')) {
                  level = 'diploma';
                } else if (newName.toLowerCase().startsWith('certificate')) {
                  level = 'certificate';
                } else {
                  level = 'degree';
                }
                form.setFieldValue('level', level);
              }}
            />
            <Select
              label='Level'
              {...form.getInputProps('level')}
              data={programLevels.map((level) => ({
                value: level,
                label: capitalCase(level),
              }))}
            />
            <Group justify='flex-end'>
              <Button variant='outline' onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button
                type='submit'
                loading={createMutation.isPending || updateMutation.isPending}
              >
                {editingProgram ? 'Update' : 'Create'}
              </Button>
            </Group>
          </Stack>
        </form>
      </Modal>
    </Box>
  );
}
