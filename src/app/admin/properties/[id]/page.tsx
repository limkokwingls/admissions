import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getProperty, deleteProperty } from '@/server/properties/actions';
import { format } from 'date-fns';

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
        <FieldView label='Acceptance Deadline'>
          {format(new Date(property.acceptanceDeadline), 'dd MMM yyyy')}
        </FieldView>
        {property.privatePaymentDate && (
          <FieldView label='Private Payment Date'>
            {format(new Date(property.privatePaymentDate), 'dd MMM yyyy')}
          </FieldView>
        )}
        <FieldView label='Registration Date (From)'>
          {format(new Date(property.registrationDateFrom), 'dd MMM yyyy')}
        </FieldView>
        <FieldView label='Registration Date (To)'>
          {format(new Date(property.registrationDateTo), 'dd MMM yyyy')}
        </FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}
