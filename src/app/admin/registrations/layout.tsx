'use client';

import { ListItem, ListLayout } from '@/components/adease';
import { formatNames } from '@/lib/utils';
import { getStudentsWithInfo } from '@/server/students/actions';
import { IconCheck } from '@tabler/icons-react';
import { PropsWithChildren } from 'react';

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
