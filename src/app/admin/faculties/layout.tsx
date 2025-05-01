'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getFaculties } from '@/server/faculties/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/faculties'}
      queryKey={['faculties']}
      getData={getFaculties}
      actionIcons={[<NewLink key={'new-link'} href='/admin/faculties/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}