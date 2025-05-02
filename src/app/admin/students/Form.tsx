'use client';

import { statusEnum, students } from '@/db/schema';
import { Form } from '@/components/adease';
import { Group, NumberInput, Select, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getAllPrograms, getPrograms } from '@/server/programs/actions';

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
  const { data: programs } = useQuery({
    queryKey: ['programs'],
    queryFn: () => getAllPrograms(),
  });

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

            <Select
              label='Program'
              {...form.getInputProps('programId')}
              searchable
              clearable
              data={programs?.items.map((program) => ({
                value: program.id.toString(),
                label: program.name,
              }))}
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
