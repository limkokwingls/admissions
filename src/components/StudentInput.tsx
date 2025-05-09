import React, { useState } from 'react';
import { Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { searchStudent } from '@/server/students/actions';

type StudentInputProps = {
  value?: string | null;
  onChange?: (value: string | null) => void;
  name?: string;
  label?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  description?: string;
  defaultValue?: string | null;
  onFocus?: () => void;
  onBlur?: () => void;
};

export default function StudentInput({
  value,
  onChange,
  name,
  label = 'Student',
  error,
  required,
  disabled,
  description,
  defaultValue,
  onFocus,
  onBlur,
}: StudentInputProps) {
  const [searchValue, setSearchValue] = useState('');

  const { data, isLoading } = useQuery({
    queryKey: ['students', searchValue],
    queryFn: () => searchStudent(searchValue),
    enabled: searchValue.length > 2, // Only search when at least 3 characters are typed
  });

  const selectData = [];

  if (data?.items && Array.isArray(data.items)) {
    for (const student of data.items) {
      selectData.push({
        value: String(student.id),
        label: `${student.candidateNo || ''} - ${student.surname} ${student.names}`,
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
      placeholder='Search for a student...'
      data={selectData}
      value={value}
      defaultValue={defaultValue}
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
      comboboxProps={{
        withinPortal: true,
        position: 'bottom',
      }}
      onFocus={onFocus}
      onBlur={onBlur}
    />
  );
}
