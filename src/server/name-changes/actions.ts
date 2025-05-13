'use server';


import { nameChanges } from '@/db/schema';
import { nameChangesService as service} from './service';

type NameChange = typeof nameChanges.$inferInsert;


export async function getNameChange(id: string) {
  return service.get(id);
}

export async function getNameChanges(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createNameChange(nameChange: NameChange) {
  return service.create(nameChange);
}

export async function updateNameChange(id: string, nameChange: NameChange) {
  return service.update(id, nameChange);
}

export async function deleteNameChange(id: string) {
  return service.delete(id);
}