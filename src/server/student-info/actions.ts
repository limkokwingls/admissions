'use server';

import { studentInfo } from '@/db/schema';
import { studentInfoService as service } from './service';

type StudentInfo = typeof studentInfo.$inferInsert;

export async function getStudentInfo(id: string) {
  return service.get(id);
}

export async function getStudentInfos(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createStudentInfo(
  studentId: string,
  studentInfo: StudentInfo,
) {
  return service.create(studentId, studentInfo);
}

export async function updateStudentInfo(
  id: string,
  studentInfo: Partial<StudentInfo>,
) {
  return service.update(id, studentInfo);
}

export async function deleteStudentInfo(id: string) {
  return service.delete(id);
}
