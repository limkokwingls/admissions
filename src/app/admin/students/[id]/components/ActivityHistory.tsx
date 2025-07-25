'use client';

import { getHistoryByStudentId } from '@/server/history/actions';
import {
  Accordion,
  AccordionControl,
  AccordionItem,
  AccordionPanel,
  Alert,
  Avatar,
  Flex,
  Group,
  Loader,
  Paper,
  Stack,
  Text,
} from '@mantine/core';
import { IconAlertCircle, IconHistory } from '@tabler/icons-react';
import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';

type Props = {
  studentId: string;
};

export default function ActivityHistory({ studentId }: Props) {
  const {
    data: historyItems,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['studentHistory', studentId],
    queryFn: async () => {
      return await getHistoryByStudentId(studentId);
    },
  });

  if (isLoading) {
    return (
      <Flex h={160} justify='center' align='center'>
        <Loader size='md' />
      </Flex>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title='Error'
        color='red'
        variant='light'
      >
        Failed to load history
      </Alert>
    );
  }

  if (!historyItems) {
    return (
      <Flex h={160} justify='center' align='center'>
        <Group gap='xs'>
          <IconHistory
            size={18}
            stroke={1.5}
            color='var(--mantine-color-dimmed)'
          />
          <Text size='sm' c='dimmed'>
            No history records found
          </Text>
        </Group>
      </Flex>
    );
  }

  return (
    <Accordion variant='separated'>
      <AccordionItem value='activity-history'>
        <AccordionControl>Activity History</AccordionControl>
        <AccordionPanel>
          <Stack gap='xs'>
            {historyItems.map((item) => {
              const formattedDate = item.performedAt
                ? format(new Date(item.performedAt), 'dd MMM yyyy')
                : 'Unknown date';

              const formattedTime = item.performedAt
                ? format(new Date(item.performedAt), 'HH:mm')
                : '';

              let actionDescription: React.ReactNode;
              if (item.action === 'acceptance_changed') {
                actionDescription = (
                  <>
                    changed status from{' '}
                    {item.oldValue === 'true' ? (
                      <Text span c='blue'>
                        Accepted
                      </Text>
                    ) : (
                      <Text span c='red'>
                        Not Accepted
                      </Text>
                    )}{' '}
                    to{' '}
                    {item.newValue === 'true' ? (
                      <Text span c='blue'>
                        Accepted
                      </Text>
                    ) : (
                      <Text span c='red'>
                        Not Accepted
                      </Text>
                    )}
                  </>
                );
              } else if (item.action === 'status_changed') {
                actionDescription = (
                  <>
                    changed student status from{' '}
                    <Text span c='blue'>
                      {item.oldValue}
                    </Text>{' '}
                    to{' '}
                    <Text span c='blue'>
                      {item.newValue}
                    </Text>
                  </>
                );
              } else {
                actionDescription = (
                  <>
                    <Text span c='blue'>
                      Printed
                    </Text>{' '}
                    admission letter
                  </>
                );
              }

              return (
                <Paper key={item.id} withBorder p='md' radius='md' shadow='xs'>
                  <Group justify='apart' mb={4}>
                    <Group gap='xs'>
                      <Avatar
                        src={item.performedBy?.image}
                        radius='xl'
                        size='sm'
                        color={
                          item.action === 'acceptance_changed'
                            ? 'blue'
                            : item.action === 'status_changed'
                              ? 'lime'
                              : 'green'
                        }
                      >
                        {item.performedBy?.name?.charAt(0) || '?'}
                      </Avatar>
                      <div>
                        <Group gap={4}>
                          <Text fw={500} size='sm'>
                            {item.performedBy?.name || 'Unknown user'}
                          </Text>
                          <Text size='xs' c='dimmed'>
                            {actionDescription}
                          </Text>
                        </Group>
                        <Group gap={4}>
                          <Text size='xs' c='dimmed'>
                            {formattedDate}
                          </Text>
                          {formattedTime && (
                            <Text size='xs' c='dimmed'>
                              at {formattedTime}
                            </Text>
                          )}
                        </Group>
                      </div>
                    </Group>
                  </Group>
                </Paper>
              );
            })}
          </Stack>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
