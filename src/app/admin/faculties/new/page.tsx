import { Box } from '@mantine/core';
import Form from '../Form';
import { createFaculty } from '@/server/faculties/actions';

export default async function NewPage() {
  return (
    <Box p={'lg'}>
      <Form title={'Create Faculty'} onSubmit={createFaculty} />
    </Box>
  );
}