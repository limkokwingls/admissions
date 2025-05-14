import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getNameChange, deleteNameChange } from '@/server/name-changes/actions';
import { getCurrentProperties } from '@/server/properties/actions';
import PrintNameChange from './components/PrintNameChange';
import { Group, Tooltip } from '@mantine/core';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function NameChangeDetails({ params }: Props) {
  const { id } = await params;
  const nameChange = await getNameChange(id);
  const properties = await getCurrentProperties();

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
        actions={[
          <Tooltip key="print-name-change" label="Print Name Change Letter">
            <PrintNameChange nameChange={nameChange} properties={properties} />
          </Tooltip>
        ]}
      />
      <DetailsViewBody>
        <FieldView label='Student'>{nameChange.studentId}</FieldView>
        <FieldView label='Old Name'>{nameChange.oldName}</FieldView>
        <FieldView label='New Name'>{nameChange.newName}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}
