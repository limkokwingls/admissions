import {
  DetailsView,
  DetailsViewHeader,
  FieldView,
  DetailsViewBody,
} from '@/components/adease';
import { notFound } from 'next/navigation';
import { getStudent, deleteStudent } from '@/server/students/actions';

type Props = {
  params: Promise<{ id: string }>;
};

export default async function StudentDetails({ params }: Props) {
  const { id } = await params;
  const student = await getStudent(id);
  
  if (!student) {
    return notFound();
  }

  return (
    <DetailsView>
      <DetailsViewHeader 
        title={'Student'} 
        queryKey={['students']}
        handleDelete={async () => {
          'use server';
          await deleteStudent(id);
        }}
      />
      <DetailsViewBody>
        <FieldView label='No'>{student.no}</FieldView>
        <FieldView label='Surname'>{student.surname}</FieldView>
        <FieldView label='Names'>{student.names}</FieldView>
        <FieldView label='Contact'>{student.contact}</FieldView>
        <FieldView label='Candidate No'>{student.candidateNo}</FieldView>
        <FieldView label='Status'>{student.status}</FieldView>
      </DetailsViewBody>
    </DetailsView>
  );
}