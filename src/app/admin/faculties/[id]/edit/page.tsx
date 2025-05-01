import { Box } from '@mantine/core';
import { notFound } from 'next/navigation';
import Form from '../../Form';
import { getFaculty, updateFaculty } from '@/server/faculties/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FacultyEdit({ params }: Props) {
  const { id } = await params;
  const faculty = await getFaculty(Number(id));
  if (!faculty) {
    return notFound();
  }

  return (
    <Box p={'lg'}>
      <Form
        title={'Edit Faculty'}
        defaultValues={faculty}
        onSubmit={async (value) => {
          'use server';
          return await updateFaculty(Number(id), value);
        }}
      />
    </Box>
  );
}