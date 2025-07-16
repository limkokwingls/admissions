'use client';

import { nameChanges } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import z from 'zod';

type NameChange = typeof nameChanges.$inferInsert;

type Props = {
  onSubmit: (values: NameChange) => Promise<NameChange>;
  defaultValues?: NameChange;
  onSuccess?: (value: NameChange) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
  ) => void;
  title?: string;
};

export default function NameChangeForm({
  onSubmit,
  defaultValues,
  title,
}: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['nameChanges']}
      schema={createInsertSchema(nameChanges) as unknown as z.ZodObject}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/name-changes/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Student' {...form.getInputProps('student')} />
          <TextInput label='Old Name' {...form.getInputProps('oldName')} />
          <TextInput label='New Name' {...form.getInputProps('newName')} />
        </>
      )}
    </Form>
  );
}
