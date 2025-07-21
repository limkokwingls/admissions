'use server';

import { auth } from '@/auth';
import { ActionType, studentHistory } from '@/db/schema/history';
import { QueryOptions } from '../base/BaseRepository';
import { historyService as service } from './service';

type StudentHistory = typeof studentHistory.$inferInsert;

export async function getHistoryItem(id: string) {
  return service.getHistoryItem(id);
}

export async function getHistoryByStudentId(studentId: string) {
  return service.getHistoryByStudentId(studentId);
}

export async function getHistoryByAction(action: ActionType) {
  return service.getHistoryByAction(action);
}

export async function getHistoryByStudentIdAndAction(
  studentId: string,
  action: ActionType,
) {
  return service.getHistoryByStudentIdAndAction(studentId, action);
}

export async function getAllHistory(
  params: QueryOptions<typeof studentHistory>,
) {
  return service.getAllHistory(params);
}

export async function createHistoryEntry(data: StudentHistory) {
  return service.createHistoryEntry(data);
}

export async function trackAcceptanceChange(
  studentId: string,
  oldValue: boolean,
  newValue: boolean,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  return service.trackAcceptanceChange(studentId, oldValue, newValue, userId);
}

export async function trackStatusChange(
  studentId: string,
  oldStatus: string,
  newStatus: string,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  return service.trackStatusChange(studentId, oldStatus, newStatus, userId);
}

export async function trackAdmissionPrinted(
  studentId: string,
  letterType?: string,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  return service.trackAdmissionPrinted(studentId, userId, letterType);
}

export async function trackNameChangePrinted(
  studentId: string,
  nameChangeId: string,
) {
  const session = await auth();
  const userId = session?.user?.id;
  if (!userId) {
    throw new Error('User not authenticated');
  }

  return service.trackNameChangePrinted(studentId, userId, nameChangeId);
}

export async function updateHistoryEntry(
  id: string,
  data: Partial<StudentHistory>,
) {
  return service.updateHistoryEntry(id, data);
}

export async function deleteHistoryEntry(id: string) {
  return service.deleteHistoryEntry(id);
}
