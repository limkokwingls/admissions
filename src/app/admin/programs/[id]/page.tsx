import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getProgram, deleteProgram } from '@/server/programs/actions';
import { Anchor } from '@mantine/core';
import Link from 'next/link';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProgramDetails({ params }: Props) {
  const { id } = await params;
  const program = await getProgram(Number(id));

  if (!program) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader
        title={'Program'}
        queryKey={['programs']}
        handleDelete={async () => {
          'use server';
          await deleteProgram(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Id'>{program.id}</FieldView>
        <FieldView label='Code'>{program.code}</FieldView>
        <FieldView label='Name'>{program.name}</FieldView>
        <FieldView label='Level'>{program.level}</FieldView>
        <FieldView label='Faculty Id'>
          <Anchor
            href={`/admin/faculties/${program.facultyId}`}
            component={Link}
          >
            {program.facultyId}
          </Anchor>
        </FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}
