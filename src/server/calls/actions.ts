'use server';

import { calls, CallStatus } from '@/db/schema';
import { callsService as service } from './service';
import { eq } from 'drizzle-orm';

type Call = typeof calls.$inferInsert;

export async function getCall(id: string) {
  return service.get(id);
}

export async function getCallsByStudentId(studentId: string) {
  return service.getByStudentId(studentId);
}

export async function getCalls(
  status: CallStatus,
  page: number = 1,
  search = '',
) {
  return service.getAll({ page, search, filter: eq(calls.status, status) });
}

export async function getCallsCountByStatus(status: CallStatus) {
  return service.getCountByStatus(status);
}

export async function createCall(call: Call) {
  return service.create(call);
}

export async function updateCall(id: string, call: Call) {
  return service.update(id, call);
}

export async function deleteCall(id: string) {
  return service.delete(id);
}

export async function updateCallStatus(id: string, status: CallStatus) {
  return service.updateCallStatus(id, status);
}

export async function incrementCallCount(id: string) {
  return service.incrementCallCount(id);
}
