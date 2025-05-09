import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getCall, deleteCall } from '@/server/calls/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CallDetails({ params }: Props) {
  const { id } = await params;
  const call = await getCall(id);
  
  if (!call) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Call'} 
        queryKey={['calls']}
        handleDelete={async () => {
          'use server';
          await deleteCall(id);
        }}
      />
      <DetailsViewBody>
        <FieldView label='Student'>{call.student}</FieldView>
        <FieldView label='Call Count'>{call.callCount}</FieldView>
        <FieldView label='Called By'>{call.calledBy}</FieldView>
        <FieldView label='Last Call At'>{call.lastCallAt}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}