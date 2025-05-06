'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getStudents } from '@/server/students/actions';
import { IconCheck } from '@tabler/icons-react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ListLayout
      path={'/admin/students'}
      queryKey={['students']}
      getData={getStudents}
      actionIcons={[<NewLink key={'new-link'} href='/admin/students/new' />]}
      renderItem={(it) => (
        <ListItem
          id={it.id}
          label={formatNames(`${it.surname} ${it.names}`)}
          rightSection={it.accepted ? <IconCheck size={'1rem'} /> : undefined}
        />
      )}
    >
      {children}
    </ListLayout>
  );
}

function formatNames(name: string): string {
  return name
    .toLowerCase()
    .split(' ')
    .map((part) =>
      part
        .split(/('|-)/g)
        .map((segment, index) =>
          index % 2 === 0
            ? segment.charAt(0).toUpperCase() + segment.slice(1)
            : segment,
        )
        .join(''),
    )
    .join(' ');
}
