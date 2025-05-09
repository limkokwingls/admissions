'use client';

import { calls } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput, NumberInput, DateInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Call = typeof calls.$inferInsert;


type Props = {
  onSubmit: (values: Call) => Promise<Call>;
  defaultValues?: Call;
  onSuccess?: (value: Call) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
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
        router.push(`/admin/calls/${id}`);
      }}
    >
      {(form) => (
        <>
          <TextInput label='Student' {...form.getInputProps('student')} />
          <NumberInput label='Call Count' {...form.getInputProps('callCount')} />
          <TextInput label='Called By' {...form.getInputProps('calledBy')} />
          <DateInput label='Last Call At' {...form.getInputProps('lastCallAt')} />
        </>
      )}
    </Form>
  );
}