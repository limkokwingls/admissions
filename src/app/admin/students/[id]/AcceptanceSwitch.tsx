'use client';
import { students } from '@/db/schema';
import { updateStudent } from '@/server/students/actions';
import {
  ActionIcon,
  Badge,
  Box,
  Button,
  Card,
  Flex,
  Group,
  Modal,
  Paper,
  Switch,
  Text,
  Title,
  Tooltip,
  rem,
  useComputedColorScheme,
  useMantineTheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconCircleCheck,
  IconEdit,
  IconExclamationCircle,
  IconExclamationMark,
} from '@tabler/icons-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState, useTransition } from 'react';

type Props = {
  student: typeof students.$inferSelect;
};

export default function AcceptanceSwitch({ student }: Props) {
  const theme = useMantineTheme();
  const [isAccepted, setIsAccepted] = useState<boolean>(student.accepted);
  const [tempIsAccepted, setTempIsAccepted] = useState<boolean>(
    student.accepted,
  );
  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const colorScheme = useComputedColorScheme('dark');

  const statusColor = isAccepted ? theme.colors.green[6] : theme.colors.gray[6];

  function update() {
    const status = tempIsAccepted;
    setIsAccepted(status);

    startTransition(async () => {
      try {
        await updateStudent(student.id, {
          ...student,
          accepted: status,
        });
        queryClient.invalidateQueries({
          queryKey: ['students'],
        });
        notifications.show({
          title: status ? 'Accepted' : 'Not Accepted',
          message: `Acceptance status updated to ${status ? 'accepted' : 'not accepted'}`,
          color: status ? 'green' : 'gray',
          icon: status ? (
            <IconCircleCheck size={rem(20)} />
          ) : (
            <IconExclamationCircle size={rem(20)} />
          ),
        });
        close();
      } catch (error) {
        setIsAccepted(student.accepted);
        setTempIsAccepted(student.accepted);
        notifications.show({
          title: 'Error updating acceptance status',
          message: error instanceof Error ? error.message : 'An error occurred',
          color: 'red',
          icon: <IconExclamationCircle size={rem(20)} />,
        });
      }
    });
  }

  return (
    <>
      <Card shadow='sm' padding='xs' radius='md' withBorder>
        <Group justify='space-between' wrap='nowrap'>
          <Group gap='xs'>
            {isAccepted ? (
              <IconCircleCheck color={theme.colors.green[6]} />
            ) : (
              <IconExclamationCircle color={theme.colors.gray[6]} />
            )}
            <Box>
              <Text fw={500} size='sm' c={statusColor}>
                {isAccepted ? 'Accepted' : 'Not Accepted'}
              </Text>
            </Box>
          </Group>

          <ActionIcon
            variant='light'
            color={isAccepted ? 'green' : 'gray'}
            size='lg'
            radius='md'
            onClick={open}
            disabled={isPending}
            loading={isPending}
          >
            <IconEdit size={'1rem'} />
          </ActionIcon>
        </Group>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title='Update Acceptance Status'
        centered
        radius='md'
        size='sm'
      >
        <Box mb='md'>
          <Text size='sm'>
            Student: {student.surname} {student.names}
          </Text>
        </Box>

        <Switch
          checked={tempIsAccepted}
          onChange={(event) => setTempIsAccepted(event.currentTarget.checked)}
          color='green'
          size='md'
          label={tempIsAccepted ? 'Accepted' : 'Not Accepted'}
          description={`Toggle to mark as ${tempIsAccepted ? 'not accepted' : 'accepted'}`}
          disabled={isPending}
        />

        <Group justify='flex-end' mt='lg'>
          <Button
            variant='default'
            onClick={() => {
              setTempIsAccepted(isAccepted);
              close();
            }}
            disabled={isPending}
          >
            Cancel
          </Button>
          <Button
            onClick={update}
            color={tempIsAccepted ? 'red' : 'green'}
            loading={isPending}
          >
            {tempIsAccepted ? 'Mark as Not Accepted' : 'Mark as Accepted'}
          </Button>
        </Group>
      </Modal>
    </>
  );
}
