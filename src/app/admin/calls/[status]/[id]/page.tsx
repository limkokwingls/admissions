import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import {
  getCall,
  deleteCall,
  updateCallStatus,
  incrementCallCount,
} from '@/server/calls/actions';
import { format, formatDistanceToNow } from 'date-fns';
import {
  Badge,
  Anchor,
  SimpleGrid,
  Paper,
  Title,
  Group,
  Text,
  Stack,
  Divider,
} from '@mantine/core';
import {
  IconPhone,
  IconUser,
  IconCalendar,
  IconClock,
  IconChartBar,
} from '@tabler/icons-react';
import Link from 'next/link';
import { CallStatus } from '@/db/schema';
import CallActions from './CallActions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CallDetails({ params }: Props) {
  const { id } = await params;
  const call = await getCall(id);

  if (!call) {
    return notFound();
  }
  const updateStatus = async (callId: string, newStatus: CallStatus) => {
    'use server';
    await updateCallStatus(callId, newStatus);
  };

  const logCall = async (callId: string) => {
    'use server';
    await incrementCallCount(callId);
  };

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
    <DetailsView>
      <DetailsViewHeader
        title={`Call #${call.id.slice(-8)}`}
        queryKey={['calls']}
        handleDelete={async () => {
          'use server';
          await deleteCall(id);
        }}
        actions={[
          <CallActions
            key='call-actions'
            callId={call.id}
            currentStatus={call.status}
            onUpdateStatus={updateStatus}
            onIncrementCall={logCall}
          />,
        ]}
      />
      <DetailsViewBody gap='lg'>
        <Group justify='space-between' align='flex-start'>
          <Title order={4} size='h5' c='dimmed'>
            Call Information
          </Title>
          <Badge
            variant='light'
            color={getStatusColor(call.status)}
            size='lg'
            leftSection={<IconPhone size={14} />}
          >
            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
          </Badge>
        </Group>

        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
          <FieldView label='Student' underline={false}>
            <Group gap='xs'>
              <IconUser size={16} color='gray' />
              <Anchor
                component={Link}
                href={`/admin/students/${call.student.id}`}
                size='sm'
                fw={500}
              >
                {call.student.surname} {call.student.names}
              </Anchor>
            </Group>
          </FieldView>

          <FieldView label='Student ID' underline={false}>
            <Text size='sm' fw={500} c='dimmed'>
              {call.student.id}
            </Text>
          </FieldView>

          <FieldView label='Call Count' underline={false}>
            <Group gap='xs'>
              <IconChartBar size={16} color='gray' />
              <Text size='sm' fw={600}>
                {call.callCount || 0} calls
              </Text>
            </Group>
          </FieldView>

          <FieldView label='Called By' underline={false}>
            <Group gap='xs'>
              <IconUser size={16} color='gray' />
              <Text size='sm' fw={500}>
                {call.calledByUser?.name || 'Unknown'}
              </Text>
            </Group>
          </FieldView>
        </SimpleGrid>

        <Paper withBorder p='md' radius='md' shadow='xs' mt='xl'>
          <Title order={5} mb='md' c='dimmed' size='sm'>
            Student Details
          </Title>
          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
            <FieldView label='Phone Number' underline={false}>
              {call.student.phoneNumber ? (
                <Anchor
                  href={`tel:${call.student.phoneNumber}`}
                  size='sm'
                  fw={500}
                  c='blue'
                >
                  {call.student.phoneNumber}
                </Anchor>
              ) : (
                <Text size='sm' fw={500} c='dimmed'>
                  Not provided
                </Text>
              )}
            </FieldView>
            <FieldView label='Program' underline={false}>
              <Text size='sm' fw={500}>
                {call.student.program?.name || 'Not assigned'}
              </Text>
            </FieldView>
          </SimpleGrid>

          <Divider my='md' />

          <Title order={4} size='h5' c='dimmed' mb='md'>
            Timeline
          </Title>

          <SimpleGrid cols={{ base: 1, sm: 2 }} spacing='md'>
            <FieldView label='Last Call' underline={false}>
              <Stack gap={4}>
                <Group gap='xs'>
                  <IconCalendar size={16} color='gray' />
                  <Text size='sm' fw={500}>
                    {call.lastCallAt
                      ? format(call.lastCallAt, 'MMM dd, yyyy')
                      : 'Never'}
                  </Text>
                </Group>
                {call.lastCallAt && (
                  <Group gap='xs' ml={20}>
                    <IconClock size={14} color='gray' />
                    <Text size='xs' c='dimmed'>
                      {formatDistanceToNow(call.lastCallAt, {
                        addSuffix: true,
                      })}
                    </Text>
                  </Group>
                )}
              </Stack>
            </FieldView>

            <FieldView label='Call Created' underline={false}>
              <Stack gap={4}>
                <Group gap='xs'>
                  <IconCalendar size={16} color='gray' />
                  <Text size='sm' fw={500}>
                    {call.createdAt
                      ? format(call.createdAt, 'MMM dd, yyyy')
                      : 'Unknown'}
                  </Text>
                </Group>
                {call.createdAt && (
                  <Group gap='xs' ml={20}>
                    <IconClock size={14} color='gray' />
                    <Text size='xs' c='dimmed'>
                      {formatDistanceToNow(call.createdAt, { addSuffix: true })}
                    </Text>
                  </Group>
                )}
              </Stack>
            </FieldView>
          </SimpleGrid>
        </Paper>
      </DetailsViewBody>
    </DetailsView>
  );
}
