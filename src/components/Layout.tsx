import { Title } from '@mantine/core';
import React from 'react';

export default function Layout({ children }: any) {
  return (
    <>
      <Title mt='xl' ta='center'>
        Admission List
      </Title>
      {children}
    </>
  );
}
