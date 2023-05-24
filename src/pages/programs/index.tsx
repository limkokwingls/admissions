import Layout from '@/components/Layout';
import { useRouter } from 'next/router';
import React from 'react';

export default function ProgramsPage() {
  const router = useRouter();
  const { type } = router.query;

  return <Layout>{type}</Layout>;
}
