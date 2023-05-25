import Layout from '@/components/Layout';
import { LinkCard } from '@/components/LinkCard';
import LinkGrid from '@/components/LinkGrid';
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
    { title: 'Diploma Programs', href: '/programs?level=Diploma' },
    { title: 'Degree Programs', href: '/programs?level=Degree' },
  ];

  return (
    <Layout>
      {/* <Container mt='sm'>
        <TextInput placeholder='Your name' label='Search' />
      </Container> */}

      <Container mt='sm'>
        <LinkGrid links={links} />
      </Container>
    </Layout>
  );
}
