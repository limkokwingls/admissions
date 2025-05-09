'use client';

import { Form } from '@/components/adease';
import StudentInput from '@/components/StudentInput';
import { calls, CallStatus } from '@/db/schema';
import { NumberInput } from '@mantine/core';
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

export default function CallForm({
  onSubmit,
  status,
  defaultValues,
  title,
}: Props) {
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
          <StudentInput {...form.getInputProps('studentId')} />
        </>
      )}
    </Form>
  );
}
