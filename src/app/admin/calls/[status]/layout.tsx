'use client';

import { PropsWithChildren } from 'react';
import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { getCalls } from '@/server/calls/actions';
import { CallStatus } from '@/db/schema';

type Props = {
  params: Promise<{ status: string }>;
} & PropsWithChildren;

export default async function Layout({ children, params }: Props) {
  const { status } = await params;
  return (
    <ListLayout
      path={'/admin/calls'}
      queryKey={['calls']}
      getData={() => getCalls(status as CallStatus)}
      actionIcons={[<NewLink key={'new-link'} href='/admin/calls/new' />]}
      renderItem={(it) => <ListItem id={it.id} label={it.id} />}
    >
      {children}
    </ListLayout>
  );
}
