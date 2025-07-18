'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getStudentsWithInfo } from '@/server/students/actions';
import { IconCheck } from '@tabler/icons-react';
import { formatNames } from '@/lib/utils';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/students'}
      queryKey={['students']}
      getData={getStudentsWithInfo}
      renderItem={(it) => (
        <ListItem
          id={it.id}
          label={formatNames(`${it.surname} ${it.names}`)}
          rightSection={
            it.accepted ? <IconCheck size={'1rem'} color='green' /> : undefined
          }
        />
      )}
    >
      {children}
    </ListLayout>
  );
}
