'use client';

import { useState } from 'react';
import { getStudent, updateStudentNames } from '@/server/students/actions';
import { ActionIcon, Button, Group, Modal, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconEdit } from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';

type Props = {
  student: Awaited<ReturnType<typeof getStudent>>;
};

type FormValues = {
  names: string;
  surname: string;
};

export default function NamesUpdate({ student }: Props) {
  const [opened, setOpened] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<FormValues>({
    initialValues: {
      names: student?.names || '',
      surname: student?.surname || '',
    },
    validate: {
      names: (value) => (value.trim() ? null : 'Names are required'),
      surname: (value) => (value.trim() ? null : 'Surname is required'),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!student?.id) return;

    try {
      await updateStudentNames(student.id, values);
      await queryClient.invalidateQueries({
        queryKey: ['student', student.id],
      });
      setOpened(false);
      form.reset();
    } catch (error) {
      console.error('Failed to update student names:', error);
    }
  };

  return (
    <>
      <ActionIcon
        variant='subtle'
        color='blue'
        onClick={() => setOpened(true)}
        title='Update student names'
      >
        <IconEdit size={16} />
      </ActionIcon>

      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title='Update Student Names'
        size='md'
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <TextInput
            label='Names'
            placeholder='Enter names'
            required
            mb='md'
            {...form.getInputProps('names')}
          />
          <TextInput
            label='Surname'
            placeholder='Enter surname'
            required
            mb='xl'
            {...form.getInputProps('surname')}
          />
          <Group justify='flex-end'>
            <Button variant='outline' onClick={() => setOpened(false)}>
              Cancel
            </Button>
            <Button type='submit'>Save Changes</Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
