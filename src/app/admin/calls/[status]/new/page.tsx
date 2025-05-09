import { Box } from '@mantine/core';
import Form from '../Form';
import { createCall } from '@/server/calls/actions';
import { CallStatus } from '@/db/schema';

type Props = {
  params: Promise<{ status: string }>;
};
export default async function NewPage({ params }: Props) {
  const { status } = await params;

  return (
    <Box p={'lg'}>
      <Form
        title={'Create Call'}
        onSubmit={createCall}
        status={status as CallStatus}
      />
    </Box>
  );
}
