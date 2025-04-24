import React from 'react';
import Providers from './providers';
import './globals.css';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <Providers>{children}</Providers>;
}
