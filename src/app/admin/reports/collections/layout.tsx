'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout } from '@/components/adease';
import { getFaculties } from '@/server/faculties/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/reports/collections'}
      queryKey={['reports/collections']}
      getData={getFaculties}
      renderItem={(it) => (
        <ListItem id={it.id} label={it.code} description={it.name} />
      )}
    >
      {children}
    </ListLayout>
  );
}
