import { Title, Stack, Image, Center, Paper } from '@mantine/core';
import React from 'react';

export default function Layout({ children }: any) {
  return (
    <>
      <Stack mb='xl'>
        <Title mt='xl' ta='center'>
          Admission List
        </Title>
        <Center>
          <Paper withBorder p='sm'>
            <Image src='/logo.png' width='250px' alt='logo' />
          </Paper>
        </Center>
      </Stack>
      {children}
    </>
  );
}
