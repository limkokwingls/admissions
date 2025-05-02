import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getProperty, updateProperty } from '@/server/properties/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyEdit({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(id);
  if (!property) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Property'}
        defaultValues={property}
        onSubmit={async (value) => {
          'use server';
          return await updateProperty(id, value);
        }}
      />
    </Box>
  );
}