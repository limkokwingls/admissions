'use client';

import { programLevels, programs } from '@/db/schema';
import { Form } from '@/components/adease';
import { NumberInput, Select, TextInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import z from 'zod';

type Program = typeof programs.$inferInsert;

type Props = {
  onSubmit: (values: Program) => Promise<Program>;
  defaultValues?: Program;
  onSuccess?: (value: Program) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
  ) => void;
  title?: string;
};

export default function ProgramForm({ onSubmit, defaultValues, title }: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['programs']}
      schema={createInsertSchema(programs) as unknown as z.ZodObject}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/programs/${id}`);
      }}
    >
      {(form) => (
        <>
          <NumberInput label='Id' {...form.getInputProps('id')} />
          <TextInput label='Code' {...form.getInputProps('code')} />
          <TextInput label='Name' {...form.getInputProps('name')} />
          <Select
            label='Level'
            {...form.getInputProps('level')}
            data={programLevels.map((level) => ({
              value: level,
              label: level,
            }))}
          />
          <NumberInput
            label='Faculty Id'
            {...form.getInputProps('facultyId')}
          />
        </>
      )}
    </Form>
  );
}
