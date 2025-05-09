'use client';

import { Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { searchStudent } from '@/server/students/actions';
import { useState } from 'react';

type StudentSelectValue = string | null;

export interface StudentSelectProps {
  value?: StudentSelectValue;
  onChange?: (value: StudentSelectValue) => void;
  name?: string;
  label?: string;
  error?: React.ReactNode;
  required?: boolean;
  disabled?: boolean;
  description?: string;
}

export default function StudentInput({
  value,
  onChange,
  name,
  label = 'Student',
  error,
  required,
  disabled,
  description,
}: StudentSelectProps) {
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['students', searchValue],
    queryFn: () => searchStudent(searchValue),
    enabled: !!searchValue,
  });

  const selectData = [];

  if (data && data.items && Array.isArray(data.items)) {
    for (const student of data.items) {
      selectData.push({
        value: student.id,
        label: `${student.no} - ${student.names}`,
      });
    }
  }

  const handleChange = (val: string | null) => {
    if (onChange) {
      onChange(val);
    }
  };

  return (
    <Select
      label={label}
      placeholder='Type to search for a student'
      data={selectData}
      value={value}
      onChange={handleChange}
      searchable
      clearable
      searchValue={searchValue}
      onSearchChange={setSearchValue}
      name={name}
      error={error}
      required={required}
      disabled={disabled || isLoading}
      description={description}
      nothingFoundMessage={
        searchValue && !isLoading ? 'No students found' : 'Type to search'
      }
    />
  );
}
