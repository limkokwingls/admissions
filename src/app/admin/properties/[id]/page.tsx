import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getProperty, deleteProperty } from '@/server/properties/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function PropertyDetails({ params }: Props) {
  const { id } = await params;
  const property = await getProperty(id);
  
  if (!property) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Property'} 
        queryKey={['properties']}
        handleDelete={async () => {
          'use server';
          await deleteProperty(id);
        }}
      />
      <DetailsViewBody>
        <FieldView label='Id'>{property.id}</FieldView>
        <FieldView label='Acceptance Fee'>{property.acceptanceFee}</FieldView>
        <FieldView label='Acceptance Deadline'>{property.acceptanceDeadline}</FieldView>
        <FieldView label='Registration Date'>{property.registrationDate}</FieldView>
        <FieldView label='Orientation Date'>{property.orientationDate}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}