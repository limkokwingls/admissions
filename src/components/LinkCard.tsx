import { Card, Text } from '@mantine/core';
import Link from 'next/link';

export function LinkCard({ link }: { link: Link }) {
  return (
    <Link href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card>
        <Text>{link.title}</Text>
      </Card>
    </Link>
  );
}
