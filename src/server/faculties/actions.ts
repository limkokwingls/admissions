'use server';


import { faculties } from '@/db/schema';
import { facultiesService as service} from './service';

type Faculty = typeof faculties.$inferInsert;


export async function getFaculty(id: number) {
  return service.get(id);
}

export async function getFaculties(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createFaculty(faculty: Faculty) {
  return service.create(faculty);
}

export async function updateFaculty(id: number, faculty: Faculty) {
  return service.update(id, faculty);
}

export async function deleteFaculty(id: number) {
  return service.delete(id);
}