'use client';

import { useState } from 'react';
import { getStudent, updateStudentNames } from '@/server/students/actions';
import {
  ActionIcon,
  Button,
  Group,
  Modal,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { IconEdit } from '@tabler/icons-react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { notifications } from '@mantine/notifications';

type Props = {
  student: Awaited<ReturnType<typeof getStudent>>;
};

type FormValues = {
  names: string;
  surname: string;
};

export default function NamesDisplay({ student }: Props) {
  const [opened, setOpened] = useState(false);
  const [displayedNames, setDisplayedNames] = useState({
    names: student?.names || '',
    surname: student?.surname || '',
  });
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

  const mutation = useMutation({
    mutationFn: (values: FormValues) =>
      updateStudentNames(student?.id || '', values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['student', student?.id],
      });
      setDisplayedNames(form.values);
      setOpened(false);
      form.reset();
      notifications.show({
        title: 'Success',
        message: `Name updated to ${form.values.surname} ${form.values.names}`,
        color: 'green',
      });
    },
    onError: (error) => {
      console.error('Failed to update student names:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to update student names',
        color: 'red',
      });
    },
  });

  const handleSubmit = async (values: FormValues) => {
    if (!student?.id) return;
    mutation.mutate(values);
  };

  return (
    <>
      <Group gap='xs'>
        <Text>
          {displayedNames.surname} {displayedNames.names}
        </Text>
        <ActionIcon
          variant='subtle'
          color='gray'
          onClick={() => setOpened(true)}
          title='Update student names'
        >
          <IconEdit size={16} />
        </ActionIcon>
      </Group>

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
            <Button type='submit' loading={mutation.isPending}>
              Save Changes
            </Button>
          </Group>
        </form>
      </Modal>
    </>
  );
}
