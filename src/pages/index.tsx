import { LinkCard } from '@/components/LinkCard';
import {
  Button,
  Card,
  Container,
  TextInput,
  Title,
  Text,
  SimpleGrid,
} from '@mantine/core';
import Link from 'next/link';

export default function Home() {
  const links: Link[] = [
    { title: 'Diploma Programs', href: '/diploma-programs' },
    { title: 'Degree Programs', href: '/degree-programs' },
  ];

  return (
    <>
      <Title ta='center'>Admission List</Title>
      <Container mt='sm'>
        <TextInput placeholder='Your name' label='Search' />
      </Container>

      <Container mt='sm'>
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
      </Container>
    </>
  );
}
