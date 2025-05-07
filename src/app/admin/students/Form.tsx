'use client';

import { Form } from '@/components/adease';
import ProgramSelect from '@/components/ProgramSelect';
import { statusEnum, students } from '@/db/schema';
import { Group, NumberInput, Select, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';

type Student = typeof students.$inferInsert;

type Props = {
  onSubmit: (values: Student) => Promise<Student>;
  defaultValues?: Student;
  onSuccess?: (value: Student) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
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
      {(form) => {
        return (
          <>
            <Group grow>
              <NumberInput label='No' {...form.getInputProps('no')} />
              <TextInput
                label='Candidate No'
                {...form.getInputProps('candidateNo')}
              />
            </Group>
            <Group grow>
              <TextInput label='Surname' {...form.getInputProps('surname')} />
              <TextInput label='Names' {...form.getInputProps('names')} />
            </Group>

            <ProgramSelect
              value={form.values.programId}
              onChange={(value) => {
                if (value === null) {
                  form.setFieldValue('programId', 0);
                  form.clearFieldError('programId');
                } else {
                  form.setFieldValue('programId', value);
                }
              }}
              error={form.errors.programId}
              required
            />

            <TextInput
              label='Phone Numbers'
              description='Comma Separated'
              {...form.getInputProps('phoneNumber')}
            />
            <Select
              label='Status'
              {...form.getInputProps('status')}
              data={statusEnum}
            />
          </>
        );
      }}
    </Form>
  );
}
