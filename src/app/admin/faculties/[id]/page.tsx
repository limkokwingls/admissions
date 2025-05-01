import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getFaculty, deleteFaculty } from '@/server/faculties/actions';
import ProgramsManager from './ProgramsManager';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function FacultyDetails({ params }: Props) {
  const { id } = await params;
  const faculty = await getFaculty(Number(id));
  
  if (!faculty) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Faculty'} 
        queryKey={['faculties']}
        handleDelete={async () => {
          'use server';
          await deleteFaculty(Number(id));
        }}
      />
      <DetailsViewBody>
        <FieldView label='Id'>{faculty.id}</FieldView>
        <FieldView label='Code'>{faculty.code}</FieldView>
        <FieldView label='Name'>{faculty.name}</FieldView>
        
        <ProgramsManager facultyId={faculty.id} />
      </DetailsViewBody>
    </DetailsView>
  );
}