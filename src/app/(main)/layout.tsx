import React from 'react';
import Providers from './providers';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
