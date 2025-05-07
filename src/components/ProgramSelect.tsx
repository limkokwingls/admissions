'use client';

import { Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { getAllPrograms } from '@/server/programs/actions';
import { useState } from 'react';

type ProgramSelectValue = number | null;

export interface ProgramSelectProps {
  value?: ProgramSelectValue;
  onChange?: (value: ProgramSelectValue) => void;
  name?: string;
  label?: string;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

export default function ProgramSelect({
  value,
  onChange,
  name,
  label = 'Program',
  error,
  required,
  disabled,
  description,
}: ProgramSelectProps) {
  const [searchValue, setSearchValue] = useState('');

  const { data } = useQuery({
    queryKey: ['programs'],
    queryFn: () => getAllPrograms(),
  });

  const selectData = [];

  if (data && data.items && Array.isArray(data.items)) {
    for (const program of data.items) {
      selectData.push({
        value: String(program.id),
        label: `${program.code} - ${program.name}`,
      });
    }
  }

  const handleChange = (val: string | null) => {
    if (onChange) {
      onChange(val ? Number(val) : null);
    }
  };

  return (
    <Select
      label={label}
      placeholder='Select a program'
      data={selectData}
      value={value !== null && value !== undefined ? String(value) : null}
      onChange={handleChange}
      searchable
      clearable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      name={name}
      error={error}
      required={required}
      disabled={disabled}
      description={description}
    />
  );
}
