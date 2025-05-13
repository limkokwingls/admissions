import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getNameChange, updateNameChange } from '@/server/name-changes/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NameChangeEdit({ params }: Props) {
  const { id } = await params;
  const nameChange = await getNameChange(id);
  if (!nameChange) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Name Change'}
        defaultValues={nameChange}
        onSubmit={async (value) => {
          'use server';
          return await updateNameChange(id, value);
        }}
      />
    </Box>
  );
}