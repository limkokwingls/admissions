'use client';

import { Button, Group } from '@mantine/core';
import { IconCheck, IconX, IconPhoneCall } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import { CallStatus } from '@/db/schema';

type Props = {
  callId: string;
  currentStatus: CallStatus;
  onUpdateStatus: (callId: string, status: CallStatus) => Promise<any>;
  onIncrementCall: (callId: string) => Promise<any>;
};

export default function CallActions({
  callId,
  currentStatus,
  onUpdateStatus,
  onIncrementCall,
}: Props) {
  const router = useRouter();
  const handleStatusUpdate = async (status: CallStatus) => {
    await onUpdateStatus(callId, status);
    router.refresh();
  };

  const handleIncrementCall = async () => {
    await onIncrementCall(callId);
    router.refresh();
  };

  return (
    <Group gap='xs'>
      {currentStatus === 'pending' && (
        <>
          <Button
            size='xs'
            variant='filled'
            color='green'
            leftSection={<IconCheck size={14} />}
            onClick={() => handleStatusUpdate('accepted')}
          >
            Accept
          </Button>
          <Button
            size='xs'
            variant='filled'
            color='red'
            leftSection={<IconX size={14} />}
            onClick={() => handleStatusUpdate('rejected')}
          >
            Reject
          </Button>
        </>
      )}
      <Button
        size='xs'
        variant='outline'
        leftSection={<IconPhoneCall size={14} />}
        onClick={handleIncrementCall}
      >
        Log Call
      </Button>
    </Group>
  );
}
