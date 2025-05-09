'use client';

import { ListItem, ListLayout, NewLink } from '@/components/adease';
import { CallStatus } from '@/db/schema';
import { getCalls } from '@/server/calls/actions';
import { useParams } from 'next/navigation';

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  const { status } = useParams();
  return (
    <ListLayout
      path={'/admin/calls'}
      queryKey={['calls', status as string]}
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
