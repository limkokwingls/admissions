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
  const [isPending, startTransition] = useTransition();
  const [opened, { open, close }] = useDisclosure(false);
  const queryClient = useQueryClient();
  const colorScheme = useComputedColorScheme('dark');

  const statusColor = isAccepted ? theme.colors.green[6] : theme.colors.gray[6];

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
      <Card
        shadow='sm'
        padding='xs'
        radius='md'
        withBorder
        style={{
          borderColor: statusColor,
          borderWidth: '2px',
          transition: 'all 0.2s ease',
        }}
      >
        <Group justify='space-between' wrap='nowrap'>
          <Group gap='xs'>
            {isAccepted ? (
              <IconCircleCheck
                size={rem(20)}
                color={theme.colors.green[6]}
                style={{ flexShrink: 0 }}
              />
            ) : (
              <IconExclamationCircle
                size={rem(20)}
                color={theme.colors.gray[6]}
                style={{ flexShrink: 0 }}
              />
            )}
            <Box>
              <Text fw={500} size='sm' c={statusColor}>
                {isAccepted ? 'Accepted' : 'Not Accepted'}
              </Text>
            </Box>
          </Group>

          <Tooltip label='Update status'>
            <ActionIcon
              variant='light'
              color={isAccepted ? 'green' : 'gray'}
              size='lg'
              radius='md'
              onClick={open}
              disabled={isPending}
              loading={isPending}
            >
              <IconEdit size={rem(16)} />
            </ActionIcon>
          </Tooltip>
        </Group>
      </Card>

      <Modal
        opened={opened}
        onClose={close}
        title={<Title order={4}>Update Acceptance Status</Title>}
        centered
        overlayProps={{
          backgroundOpacity: 0.55,
          blur: 3,
        }}
        radius='md'
        padding='lg'
        size='md'
      >
        <Paper p='lg' withBorder shadow='md' radius='md'>
          <Box mb='md'>
            <Text size='sm' c='dimmed' mb={4}>
              Student
            </Text>
            <Text fw={600} size='lg'>
              {student.surname} {student.names}
            </Text>
          </Box>

          <Card
            withBorder
            p='md'
            radius='md'
            mb='lg'
            bg={
              colorScheme === 'dark'
                ? theme.colors.dark[8]
                : theme.colors.gray[0]
            }
          >
            <Text fw={500} size='sm' mb='md'>
              Current Status
            </Text>

            <Group justify='apart' mb='md'>
              <Text size='xl' fw={700} c={statusColor}>
                {isAccepted ? 'Accepted' : 'Not Accepted'}
              </Text>

              {isAccepted ? (
                <IconCircleCheck size={rem(24)} color={theme.colors.green[6]} />
              ) : (
                <IconExclamationCircle
                  size={rem(24)}
                  color={theme.colors.gray[6]}
                />
              )}
            </Group>

            <Text size='sm' c='dimmed'>
              Change the status using the switch below
            </Text>
          </Card>

          <Flex direction='column' gap='md'>
            <Switch
              checked={isAccepted}
              onChange={update}
              color='green'
              size='lg'
              radius='xl'
              label={
                <Text fw={500} size='md'>
                  {isPending
                    ? 'Updating...'
                    : isAccepted
                      ? 'Accepted'
                      : 'Not Accepted'}
                </Text>
              }
              description={`Toggle to mark as ${isAccepted ? 'not accepted' : 'accepted'}`}
              disabled={isPending}
              styles={{
                track: {
                  cursor: 'pointer',
                },
              }}
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

            <Group justify='flex-end' mt='xl'>
              <Button
                variant='default'
                onClick={close}
                disabled={isPending}
                radius='md'
              >
                Cancel
              </Button>
              <Button
                onClick={update}
                color={isAccepted ? 'red' : 'green'}
                loading={isPending}
                radius='md'
                leftSection={
                  isAccepted ? (
                    <IconExclamationCircle size={rem(16)} />
                  ) : (
                    <IconCircleCheck size={rem(16)} />
                  )
                }
              >
                {isAccepted ? 'Mark as Not Accepted' : 'Mark as Accepted'}
              </Button>
            </Group>
          </Flex>
        </Paper>
      </Modal>
    </>
  );
}
