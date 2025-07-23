'use server';

import { students } from '@/db/schema';
import { createNameChange } from '../name-changes/actions';
import { studentsService as service } from './service';

type Student = typeof students.$inferInsert;

export async function getStudent(id: string) {
  return service.get(id);
}

export async function getStudentByReference(reference: string) {
  return service.getByReference(reference);
}

export async function searchStudent(q: string) {
  return service.getAll({ page: 1, search: q });
}

export async function getStudentsWithInfo(page: number = 1, search = '') {
  return service.getStudentsWithInfo({ page, search });
}

export async function getStudentsWithInfoCount() {
  return service.getStudentsWithInfoCount();
}

export async function getStudents(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createStudent(student: Student) {
  return service.create(student);
}

export async function updateStudent(id: string, student: Student) {
  return service.update(id, student);
}

export async function deleteStudent(id: string) {
  return service.delete(id);
}

export async function updateStudentNames(
  id: string,
  data: Pick<Student, 'names' | 'surname'>,
) {
  const student = await getStudent(id);
  if (!student) {
    throw new Error('Student not found');
  }

  await service.update(id, {
    ...student,
    ...data,
  });

  await createNameChange({
    studentId: id,
    oldName: `${student.surname} ${student.names}`,
    newName: `${data.surname} ${data.names}`,
  });
}

export async function getAcceptedStudentsByFaculty(
  facultyId?: number,
  programId?: number,
  registered?: string | null,
  status?: string | null,
  page: number = 1,
) {
  const data = await service.getAcceptedByFaculty({
    facultyId,
    programId,
    registered,
    status,
    page,
  });
  return {
    items: data.items,
    totalPages: data.totalPages,
    totalItems: data.totalItems,
  };
}
