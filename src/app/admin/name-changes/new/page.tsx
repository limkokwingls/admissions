import { Box } from '@mantine/core';
import Form from '../Form';
import { createNameChange } from '@/server/name-changes/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Name Change'} onSubmit={createNameChange} />
    </Box>
  );
}