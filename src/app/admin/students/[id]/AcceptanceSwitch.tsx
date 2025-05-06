'use client';
import { students } from '@/db/schema';
import { updateStudent } from '@/server/students/actions';
import { Flex, Switch, rem, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconCheck,
  IconCircleCheck,
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
  const [isPending, startTransition] = useTransition();
  const queryClient = useQueryClient();

  function update() {
    const status = !isAccepted;
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
          title: status ? 'Accepted' : 'Unaccepted',
          message: `Acceptance status updated to ${status ? 'accepted' : 'unaccepted'}`,
          color: status ? 'green' : 'gray',
          icon: status ? (
            <IconCircleCheck size={rem(20)} />
          ) : (
            <IconExclamationCircle size={rem(20)} />
          ),
        });
      } catch (error) {
        setIsAccepted(student.accepted);
        notifications.show({
          title: 'Error updating acceptance status',
          message: error instanceof Error ? error.message : 'An error occurred',
          color: 'gray',
          icon: <IconExclamationCircle size={rem(20)} />,
        });
      }
    });
  }

  return (
    <Flex justify='space-between'>
      <Switch
        checked={isAccepted}
        onChange={update}
        color='green'
        size='sm'
        label={
          isPending ? 'Updating...' : isAccepted ? 'Accepted' : 'Unaccepted'
        }
        description={`Click switch to mark as ${isAccepted ? 'unaccepted' : 'accepted'}`}
        disabled={isPending}
        thumbIcon={
          isAccepted ? (
            <IconCheck
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.green[5]}
              stroke={3}
            />
          ) : (
            <IconExclamationMark
              style={{ width: rem(12), height: rem(12) }}
              color={theme.colors.red[6]}
              stroke={3}
            />
          )
        }
      />
      {isAccepted ? (
        <IconCircleCheck size='2rem' color={theme.colors.green[5]} />
      ) : (
        <IconExclamationCircle size='2rem' color={theme.colors.gray[5]} />
      )}
    </Flex>
  );
}
