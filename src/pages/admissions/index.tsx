import Layout from '@/components/Layout';
import { db } from '@/lib/firebase';
import { Container, Table } from '@mantine/core';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

export default function AdmissionsPage() {
  const router = useRouter();
  const { program } = router.query;
  const [students, setStudents] = React.useState<Student[]>([]);

  useEffect(() => {
    const getData = async () => {
      console.log('programName', '==', program);
      const q = query(
        collection(db, 'students'),
        where('programName', '==', program),
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
      getData();
    }
  }, [program]);

  const rows = students.map((it) => (
    <tr key={it.id}>
      <td>{it.names}</td>
      <td>{it.surname}</td>
      <td>{it.candidateNum}</td>
    </tr>
  ));

  return (
    <Layout>
      <Container>
        <Table>
          <thead>
            <tr>
              <th>Names</th>
              <th>Surname</th>
              <th>Candidate No.</th>
            </tr>
          </thead>
          <tbody>{rows}</tbody>
        </Table>
      </Container>
    </Layout>
  );
}
