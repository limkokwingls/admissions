'use client';

import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { CallStatus } from '@/db/schema';
import { formatNames } from '@/lib/utils';
import { getCalls } from '@/server/calls/actions';
import { useParams } from 'next/navigation';
import { Badge, Group, Text, Stack } from '@mantine/core';
import { IconPhone, IconClock } from '@tabler/icons-react';
import { formatDistanceToNow } from 'date-fns';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { status } = useParams();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      case 'pending':
        return 'yellow';
      default:
        return 'gray';
    }
  };

  return (
    <ListLayout
      path={`/admin/calls/${status}`}
      queryKey={['calls', status as string]}
      getData={(page, search) => getCalls(status as CallStatus, page, search)}
      actionIcons={[
        <NewLink key={'new-link'} href={`/admin/calls/${status}/new`} />,
      ]}
      renderItem={(it) => (
        <ListItem
          id={it.id}
          path={`/admin/calls/${status}/${it.id}`}
          label={
            <Stack gap={4}>
              <Group justify='space-between' wrap='nowrap'>
                <Text size='sm' fw={500} truncate>
                  {formatNames(`${it.student.surname} ${it.student.names}`)}
                </Text>
                <Badge
                  size='xs'
                  variant='light'
                  color={getStatusColor(it.status)}
                >
                  {it.status}
                </Badge>
              </Group>
              <Group gap='xs' c='dimmed'>
                <Group gap={4}>
                  <IconPhone size={12} />
                  <Text size='xs'>{it.callCount || 0} calls</Text>
                </Group>
                {it.lastCallAt && (
                  <Group gap={4}>
                    <IconClock size={12} />
                    <Text size='xs'>
                      {formatDistanceToNow(it.lastCallAt, { addSuffix: true })}
                    </Text>
                  </Group>
                )}
              </Group>
            </Stack>
          }
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
