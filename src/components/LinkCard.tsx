import { Card, Text, createStyles, Flex } from '@mantine/core';
import Link from 'next/link';

export function LinkCard({ link }: { link: Link }) {
  const { classes } = useStyles();
  return (
    <Link href={link.href} style={{ textDecoration: 'none', color: 'inherit' }}>
      <Card styles={classes.card} h={100} shadow='md'>
        <Flex justify='center' align='center' h='100%'>
          <Text align='center'>{link.title}</Text>
        </Flex>
      </Card>
    </Link>
  );
}

const useStyles = createStyles((theme) => ({
  card: {},
}));
