'use client';

import { properties } from '@/db/schema';
import { Form } from '@/components/adease';
import { NumberInput } from '@mantine/core';
import { createInsertSchema } from 'drizzle-zod';
import { useRouter } from 'next/navigation';
import { DateInput, YearPickerInput, DatePickerInput } from '@mantine/dates';

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
          <YearPickerInput
            label='Id'
            {...form.getInputProps('id', { type: 'input' })}
            value={form.values.id ? new Date(form.values.id) : null}
            onChange={(value) =>
              form.setFieldValue(
                'id',
                value ? new Date(value).getFullYear().toString() : '',
              )
            }
          />
          <NumberInput
            label='Acceptance Fee'
            {...form.getInputProps('acceptanceFee')}
          />
          <DateInput
            label='Acceptance Deadline'
            valueFormat='DD/MM/YYYY'
            firstDayOfWeek={0}
            {...form.getInputProps('acceptanceDeadline')}
          />
          <DateInput
            label='Registration Date'
            valueFormat='DD/MM/YYYY'
            firstDayOfWeek={0}
            {...form.getInputProps('registrationDate')}
          />
          <DateInput
            label='Orientation Date'
            valueFormat='DD/MM/YYYY'
            firstDayOfWeek={0}
            {...form.getInputProps('orientationDate')}
          />
          <DatePickerInput
            type="range"
            label='Private Payment Date Range'
            placeholder="Select date range"
            valueFormat='DD/MM/YYYY'
            firstDayOfWeek={0}
            clearable
            value={[
              form.values.privatePaymentDateFrom ? new Date(form.values.privatePaymentDateFrom) : null,
              form.values.privatePaymentDateTo ? new Date(form.values.privatePaymentDateTo) : null
            ]}
            onChange={(dates) => {
              // Handle the dates array safely
              if (Array.isArray(dates)) {
                // Convert to ISO string format for storage
                const startDate = dates[0] ? new Date(dates[0]).toISOString() : null;
                const endDate = dates[1] ? new Date(dates[1]).toISOString() : null;
                
                form.setFieldValue('privatePaymentDateFrom', startDate);
                form.setFieldValue('privatePaymentDateTo', endDate);
              } else {
                // Reset values if dates is null/undefined
                form.setFieldValue('privatePaymentDateFrom', null);
                form.setFieldValue('privatePaymentDateTo', null);
              }
            }}
          />
        </>
      )}
    </Form>
  );
}
