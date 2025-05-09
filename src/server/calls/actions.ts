'use server';


import { calls } from '@/db/schema';
import { callsService as service} from './service';

type Call = typeof calls.$inferInsert;


export async function getCall(id: string) {
  return service.get(id);
}

export async function getCalls(page: number = 1, search = '') {
  return service.getAll({ page, search });
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