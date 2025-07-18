'use client';

import { users } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import z from 'zod';

type User = typeof users.$inferInsert;

type Props = {
  onSubmit: (values: User) => Promise<User>;
  defaultValues?: User;
  onSuccess?: (value: User) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
  ) => void;
  title?: string;
};

export default function UserForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['users']}
      schema={createInsertSchema(users) as unknown as z.ZodObject}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/users/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Name' {...form.getInputProps('name')} />
          <TextInput label='Email' {...form.getInputProps('email')} />
          <TextInput label='Image' {...form.getInputProps('image')} />
        </>
      )}
    </Form>
  );
}
