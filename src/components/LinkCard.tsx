import { Card, Text, createStyles } from '@mantine/core';
import Link from 'next/link';

export function LinkCard({ link }: { link: Link }) {
  const { classes } = useStyles();
  return (
    <Link href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card styles={classes.card} h={100} shadow='md'>
        <Text>{link.title}</Text>
      </Card>
    </Link>
  );
}

const useStyles = createStyles((theme) => ({
  card: {},
}));
