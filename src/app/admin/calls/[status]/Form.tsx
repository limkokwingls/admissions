'use client';

import { Form } from '@/components/adease';
import { calls, CallStatus } from '@/db/schema';
import { TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Call = typeof calls.$inferInsert;

type Props = {
  onSubmit: (values: Call) => Promise<Call>;
  status: CallStatus;
  defaultValues?: Call;
  onSuccess?: (value: Call) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
  ) => void;
  title?: string;
};

export default function CallForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['calls']}
      schema={createInsertSchema(calls)}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/calls/pending/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Student ID' {...form.getInputProps('studentId')} />
        </>
      )}
    </Form>
  );
}
