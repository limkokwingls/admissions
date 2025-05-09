'use client';

import { Select } from '@mantine/core';
import { useQuery } from '@tanstack/react-query';
import { searchStudent } from '@/server/students/actions';
import { useState, useEffect } from 'react';

type StudentSelectValue = string | null;

export interface StudentInputProps {
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
}: StudentInputProps) {
  const [searchValue, setSearchValue] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchValue);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchValue]);

  const { data, isLoading } = useQuery({
    queryKey: ['students', debouncedSearch],
    queryFn: () => searchStudent(debouncedSearch),
    enabled: debouncedSearch.length > 2,
  });

  const selectData = [];

  if (data && data.items && Array.isArray(data.items)) {
    for (const student of data.items) {
      selectData.push({
        value: student.id,
        label: `${student.surname}, ${student.names} (${student.candidateNo || 'No ID'})`,
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
      placeholder='Search for a student'
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
      description={
        description ||
        (debouncedSearch.length > 2 && !isLoading && selectData.length === 0
          ? 'No students found'
          : debouncedSearch.length > 0 && debouncedSearch.length <= 2
            ? 'Type at least 3 characters to search'
            : '')
      }
    />
  );
}
