import React from 'react';
import { getAcceptedStudentsByFaculty } from '@/server/students/actions';
import { getProgramsForFaculty } from '@/server/programs/actions';
import { getFaculty } from '@/server/faculties/actions';
import { Suspense } from 'react';
import { AcceptedStudentsTable } from './components/AcceptedStudentsTable';

type Props = {
  params: Promise<{ facultyId: string }>;
};

export default async function Page({ params }: Props) {
  const facultyId = (await params).facultyId;

  const faculty = await getFaculty(parseInt(facultyId));

  const programs = await getProgramsForFaculty(parseInt(facultyId));

  const studentsResult = await getAcceptedStudentsByFaculty(
    parseInt(facultyId),
  );

  return (
    <div className='container mx-auto px-4 py-6'>
      <div className='mb-6'>
        <h1 className='mb-2 text-2xl font-bold'>
          {faculty?.name} - Accepted Students Collection Report
        </h1>
        <p className='text-gray-600'>
          Total Records: {studentsResult.meta.total}
        </p>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <AcceptedStudentsTable
          students={studentsResult.data}
          programs={programs.items}
          meta={studentsResult.meta}
          facultyId={parseInt(facultyId)}
        />
      </Suspense>
    </div>
  );
}
