import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getNameChange, deleteNameChange } from '@/server/name-changes/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NameChangeDetails({ params }: Props) {
  const { id } = await params;
  const nameChange = await getNameChange(id);
  
  if (!nameChange) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Name Change'} 
        queryKey={['nameChanges']}
        handleDelete={async () => {
          'use server';
          await deleteNameChange(id);
        }}
      />
      <DetailsViewBody>
        <FieldView label='Student'>{nameChange.student}</FieldView>
        <FieldView label='Old Name'>{nameChange.oldName}</FieldView>
        <FieldView label='New Name'>{nameChange.newName}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}