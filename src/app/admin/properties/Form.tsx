'use client';

import { properties } from '@/db/schema';
import { Form } from '@/components/adease';
import { TextInput, NumberInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { DateInput, YearPickerInput } from '@mantine/dates';

type Property = typeof properties.$inferInsert;

type Props = {
  onSubmit: (values: Property) => Promise<Property>;
  defaultValues?: Property;
  onSuccess?: (value: Property) => void;
  onError?: (
    error: Error | React.SyntheticEvent<HTMLDivElement, Event>,
  ) => void;
  title?: string;
};

export default function PropertyForm({
  onSubmit,
  defaultValues,
  title,
}: Props) {
  const router = useRouter();

  return (
    <Form
      title={title}
      action={onSubmit}
      queryKey={['properties']}
      schema={createInsertSchema(properties)}
      defaultValues={defaultValues}
      onSuccess={({ id }) => {
        router.push(`/admin/properties/${id}`);
      }}
    >
      {(form) => (
        <>
          <YearPickerInput label='Id' {...form.getInputProps('id')} />
          <NumberInput
            label='Acceptance Fee'
            {...form.getInputProps('acceptanceFee')}
          />
          <DateInput
            label='Acceptance Deadline'
            {...form.getInputProps('acceptanceDeadline')}
          />
          <DateInput
            label='Registration Date'
            {...form.getInputProps('registrationDate')}
          />
          <DateInput
            label='Orientation Date'
            {...form.getInputProps('orientationDate')}
          />
        </>
      )}
    </Form>
  );
}
