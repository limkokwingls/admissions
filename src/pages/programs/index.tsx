import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import LinkGrid from '@/components/LinkGrid';
import { Container, SimpleGrid, Skeleton } from '@mantine/core';

export default function ProgramsPage() {
  const router = useRouter();
  const { level } = router.query;
  const [programs, setPrograms] = React.useState<Program[]>([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log('level', '==', level);
      const q = query(collection(db, 'programs'), where('level', '==', level));
      const querySnapshot = await getDocs(q);
      const items: Program[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id } as Program);
      });
      setPrograms(items);
    };
    if (level) {
      setLoading(true);
      getData().finally(() => setLoading(false));
    }
  }, [level]);

  return (
    <Layout>
      <Container>
        {loading ? (
          <Loading />
        ) : (
          <LinkGrid
            links={programs.map((it) => ({
              title: it.name,
              href: `/admissions?program=${encodeURIComponent(it.name)}`,
            }))}
          />
        )}
      </Container>
    </Layout>
  );
}

const Loading = () => {
  return (
    <SimpleGrid
      mt='md'
      breakpoints={[
        { cols: 2, spacing: 'sm' },
        { cols: 1, spacing: 'xs' },
      ]}
    >
      <Skeleton h={100} />
      <Skeleton h={100} />
    </SimpleGrid>
  );
};
