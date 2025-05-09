'use client';

import { calls, CallStatus } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput, NumberInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { DateInput } from '@mantine/dates';
import StudentInput from '@/components/StudentInput';

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
          <NumberInput
            label='Call Count'
            {...form.getInputProps('callCount')}
          />
          <TextInput label='Called By' {...form.getInputProps('calledBy')} />
          <DateInput
            label='Last Call At'
            {...form.getInputProps('lastCallAt')}
          />
        </>
      )}
    </Form>
  );
}
