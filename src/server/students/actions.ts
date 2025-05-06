'use server';

import { students } from '@/db/schema';
import { studentsService as service } from './service';

type Student = typeof students.$inferInsert;

export async function getStudent(id: string) {
  return service.get(id);
}

export async function searchStudent(q: string) {
  return service.getAll({ page: 1, search: q });
}

export async function getStudents(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createStudent(student: Student) {
  return service.create(student);
}

export async function createOrUpdateStudent(student: Student) {
  return service.createOrUpdate(student);
}

export async function updateStudent(id: string, student: Student) {
  return service.update(id, student);
}

export async function deleteStudent(id: string) {
  return service.delete(id);
}
