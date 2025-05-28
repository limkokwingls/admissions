'use server';

import { nameChanges } from '@/db/schema';
import { nameChangesService as service } from './service';
import { auth } from '@/auth';

type NameChange = typeof nameChanges.$inferInsert;

export async function getNameChangeByStudent(studentId: string) {
  return service.getByStudent(studentId);
}

export async function getNameChange(id: string) {
  return service.get(id);
}

export async function getNameChanges(page: number = 1, search = '') {
  return service.getAll({
    page,
    search,
    searchColumns: ['newName', 'oldName'],
  });
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

export async function trackNameChangePrinted(nameChangeId: string) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  const nameChange = await getNameChange(nameChangeId);
  if (!nameChange) {
    throw new Error('Name change not found');
  }

  const { trackNameChangePrinted: trackInHistory } = await import(
    '../history/actions'
  );
  return trackInHistory(nameChange.studentId, nameChangeId);
}
