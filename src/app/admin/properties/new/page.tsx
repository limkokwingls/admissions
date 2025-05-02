import { Box } from '@mantine/core';
import Form from '../Form';
import { createProperty } from '@/server/properties/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Property'} onSubmit={createProperty} />
    </Box>
  );
}