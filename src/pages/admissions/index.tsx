import Layout from '@/components/Layout';
import { db } from '@/lib/firebase';
import { Badge, Center, Container, Loader, Table, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AdmissionsPage() {
  const router = useRouter();
  const { program } = router.query;
  const [students, setStudents] = React.useState<Student[]>([]);
  const isMobile = useMediaQuery('(max-width: 768px)');
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const getData = async () => {
      console.log('programName', '==', program);
      const q = query(
        collection(db, 'students'),
        where('programName', '==', program),
        orderBy('status'),
        orderBy('names')
      );
      const querySnapshot = await getDocs(q);
      const items: Student[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ ...doc.data(), id: doc.id } as Student);
      });
      setStudents(items);
    };
    if (program) {
      setLoading(true);
      getData().finally(() => setLoading(false));
    }
  }, [program]);

  function formatName(student: Student) {
    if (!student.names) return '';
    return isMobile ? student.names.split(' ')[0] : student.names;
  }

  let count = 0;
  const rows = students.map((it) => (
    <tr key={it.id}>
      <td>{++count}</td>
      <td>{formatName(it)}</td>
      <td>{it.surname}</td>
      {!isMobile && <td>{it.candidateNum}</td>}
      <td>
        <Badge
          size='sm'
          variant='outline'
          color={it.status != 'Admitted' ? 'red' : ''}
        >
          {it.status}
        </Badge>
      </td>
    </tr>
  ));

  return (
    <Layout>
      <Container>
        <Title align='center' order={2} fw={500} mb='xl'>
          {program}
        </Title>
        {loading ? (
          <Center mt='xl'>
            <Loader />
          </Center>
        ) : (
          <Table striped withBorder={!isMobile}>
            <thead>
              <tr>
                <th>No</th>
                <th>Names</th>
                <th>Surname</th>
                {!isMobile && <th>Candidate No.</th>}
                <th>Admission</th>
              </tr>
            </thead>
            <tbody>{rows}</tbody>
          </Table>
        )}
      </Container>
    </Layout>
  );
}
