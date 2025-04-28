'use client';

import { students } from '@/db/schema';
import { Form } from '@/components/adease';
import { NumberInput, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Student = typeof students.$inferInsert;


type Props = {
  onSubmit: (values: Student) => Promise<Student>;
  defaultValues?: Student;
  onSuccess?: (value: Student) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>
  ) => void;
  title?: string;
};

export default function StudentForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();
  
  return (
    <Form 
      title={title}
      action={onSubmit} 
      queryKey={['students']}
      schema={createInsertSchema(students)} 
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/students/${id}`);
      }}
    >
      {(form) => (
        <>
          <NumberInput label='No' {...form.getInputProps('no')} />
          <TextInput label='Surname' {...form.getInputProps('surname')} />
          <TextInput label='Names' {...form.getInputProps('names')} />
          <TextInput label='Contact' {...form.getInputProps('contact')} />
          <TextInput label='Candidate No' {...form.getInputProps('candidateNo')} />
          <TextInput label='Status' {...form.getInputProps('status')} />
        </>
      )}
    </Form>
  );
}