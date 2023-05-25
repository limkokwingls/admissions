import { Title, Stack, Image, Center, Paper, Button } from '@mantine/core';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';

export default function Layout({ children }: any) {
  const router = useRouter();
  const isHome = router.pathname === '/';
  return (
    <>
      <Title mt='xl' ta='center'>
        Admission List
      </Title>
      <Stack mb='xl' align='center' p='sm'>
        {!isHome && (
          <Link href='/'>
            <Button color='dark'>Home</Button>
          </Link>
        )}
        <Paper withBorder p='sm'>
          <Image src='/logo.png' width='250px' alt='logo' />
        </Paper>
      </Stack>
      {children}
    </>
  );
}
