import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getCall, updateCall } from '@/server/calls/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CallEdit({ params }: Props) {
  const { id } = await params;
  const call = await getCall(id);
  if (!call) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Call'}
        defaultValues={call}
        onSubmit={async (value) => {
          'use server';
          return await updateCall(id, value);
        }}
      />
    </Box>
  );
}