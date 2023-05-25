import { SimpleGrid } from '@mantine/core';
import React from 'react';
import { LinkCard } from './LinkCard';

export default function LinkGrid({ links }: { links: Link[] }) {
  return (
    <SimpleGrid
      mt='md'
      breakpoints={[
        { cols: 2, spacing: 'sm' },
        { cols: 1, spacing: 'xs' },
      ]}
    >
      {links.map((link) => (
        <LinkCard key={link.href} link={link} />
      ))}
    </SimpleGrid>
  );
}
