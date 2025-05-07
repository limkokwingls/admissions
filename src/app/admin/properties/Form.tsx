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
            label='Year (ID)'
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
          <DatePickerInput
            type='range'
            label='Registration Date Range'
            valueFormat='DD/MM/YYYY'
            firstDayOfWeek={0}
            value={[
              form.values.registrationDateFrom
                ? new Date(form.values.registrationDateFrom)
                : null,
              form.values.registrationDateTo
                ? new Date(form.values.registrationDateTo)
                : null,
            ]}
            onChange={(dates) => {
              if (Array.isArray(dates)) {
                const startDate = dates[0]
                  ? new Date(dates[0]).toISOString()
                  : '';
                const endDate = dates[1]
                  ? new Date(dates[1]).toISOString()
                  : '';

                form.setFieldValue('registrationDateFrom', startDate);
                form.setFieldValue('registrationDateTo', endDate);
              } else {
                form.setFieldValue('registrationDateFrom', '');
                form.setFieldValue('registrationDateTo', '');
              }
            }}
          />
          <DatePickerInput
            type='range'
            label='Private Payment Date Range'
            valueFormat='DD/MM/YYYY'
            firstDayOfWeek={0}
            clearable
            value={[
              form.values.privatePaymentDateFrom
                ? new Date(form.values.privatePaymentDateFrom)
                : null,
              form.values.privatePaymentDateTo
                ? new Date(form.values.privatePaymentDateTo)
                : null,
            ]}
            onChange={(dates) => {
              if (Array.isArray(dates)) {
                const startDate = dates[0]
                  ? new Date(dates[0]).toISOString()
                  : null;
                const endDate = dates[1]
                  ? new Date(dates[1]).toISOString()
                  : null;

                form.setFieldValue('privatePaymentDateFrom', startDate);
                form.setFieldValue('privatePaymentDateTo', endDate);
              } else {
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
