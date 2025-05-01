'use client';

import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Table,
  Button,
  Group,
  Text,
  Modal,
  TextInput,
  Stack,
  ActionIcon,
  Box,
} from '@mantine/core';
import { useForm, zodResolver } from '@mantine/form';
import { z } from 'zod';
import { IconEdit, IconTrash, IconPlus } from '@tabler/icons-react';
import {
  getProgramsForFaculty,
  createProgram,
  updateProgram,
  deleteProgram,
} from '@/server/programs/actions';

const programSchema = z.object({
  code: z.string().min(1, 'Code is required'),
  name: z.string().min(1, 'Name is required'),
  facultyId: z.number(),
});

type Program = z.infer<typeof programSchema> & { id?: number };

type ProgramsManagerProps = {
  facultyId: number;
};

export default function ProgramsManager({ facultyId }: ProgramsManagerProps) {
  const [modalOpened, setModalOpened] = useState(false);
  const [editingProgram, setEditingProgram] = useState<Program | null>(null);

  const queryClient = useQueryClient();

  const { data: programsData } = useQuery({
    queryKey: ['programs', facultyId],
    queryFn: () => getProgramsForFaculty(facultyId),
  });

  const programs = programsData?.items || [];

  const form = useForm({
    initialValues: {
      code: '',
      name: '',
      facultyId: facultyId,
    },
    validate: zodResolver(programSchema),
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
        code: program.code,
        name: program.name,
        facultyId: program.facultyId,
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
          leftSection={<IconPlus size={16} />}
          onClick={() => handleOpenModal()}
        >
          Add Program
        </Button>
      </Group>

      <Table striped highlightOnHover withTableBorder>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>Code</Table.Th>
            <Table.Th>Name</Table.Th>
            <Table.Th style={{ width: 120 }}>Actions</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>
          {programs.length === 0 ? (
            <Table.Tr>
              <Table.Td colSpan={3} align='center'>
                <Text c='dimmed'>No programs found</Text>
              </Table.Td>
            </Table.Tr>
          ) : (
            programs.map(
              (program: {
                id: number;
                code: string;
                name: string;
                facultyId: number;
              }) => (
                <Table.Tr key={program.id}>
                  <Table.Td>{program.code}</Table.Td>
                  <Table.Td>{program.name}</Table.Td>
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
