import { Box } from '@mantine/core';
import Form from '../Form';
import { createCall } from '@/server/calls/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Call'} onSubmit={createCall} />
    </Box>
  );
}