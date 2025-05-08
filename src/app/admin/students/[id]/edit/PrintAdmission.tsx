'use client';
import { ActionIcon } from '@mantine/core';
import { IconPrinter } from '@tabler/icons-react';
import React from 'react';
import { getStudent } from '@/server/students/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import { Text } from '@mantine/core';

type Props = {
  student: NonNullable<Awaited<ReturnType<typeof getStudent>>>;
  properties: Awaited<ReturnType<typeof getCurrentProperties>>;
};

export default function PrintAdmission({ student, properties }: Props) {
  if (!properties) {
    return (
      <Text c='red' size='xs'>
        Cannot print, properties not found
      </Text>
    );
  }

  return (
    <ActionIcon variant='outline' color='gray' onClick={() => {}}>
      <IconPrinter size={'1rem'} />
    </ActionIcon>
  );
}
