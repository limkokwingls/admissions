'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getCalls } from '@/server/calls/actions';
import { CallStatus } from '@/db/schema';

type Props = {
  params: { status: string };
} & PropsWithChildren;

export default function Layout({ children, params }: Props) {
  const { status } = params;
  return (
    <ListLayout
      path={'/admin/calls'}
      queryKey={['calls', status]}
      getData={(page, search) => getCalls(status as CallStatus, page, search)}
      actionIcons={[
        <NewLink key={'new-link'} href={`/admin/calls/${status}/new`} />,
      ]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}
