'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getNameChanges } from '@/server/name-changes/actions';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/name-changes'}
      queryKey={['nameChanges']}
      getData={getNameChanges}
      actionIcons={[
        <NewLink key={'new-link'} href='/admin/name-changes/new' />,
      ]}
      renderItem={(it) => (
        <ListItem
          id={it.id}
          label={it.newName}
          description={`Old: ${it.oldName}`}
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
