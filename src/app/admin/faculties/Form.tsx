'use client';

import { faculties } from '@/db/schema';
import { Form } from '@/components/adease';
import { NumberInput, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import z from 'zod';

type Faculty = typeof faculties.$inferInsert;

type Props = {
  onSubmit: (values: Faculty) => Promise<Faculty>;
  defaultValues?: Faculty;
  onSuccess?: (value: Faculty) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
  ) => void;
  title?: string;
};

export default function FacultyForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['faculties']}
      schema={createInsertSchema(faculties) as unknown as z.ZodObject}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/faculties/${id}`);
      }}
    >
      {(form) => (
        <>
          <NumberInput label='Id' {...form.getInputProps('id')} />
          <TextInput label='Code' {...form.getInputProps('code')} />
          <TextInput label='Name' {...form.getInputProps('name')} />
        </>
      )}
    </Form>
  );
}
