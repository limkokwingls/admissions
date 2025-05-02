'use server';

import { properties } from '@/db/schema';
import { propertiesService as service } from './service';

type Property = typeof properties.$inferInsert;

export async function getCurrentProperties() {
  return service.get(new Date().getFullYear().toString());
}

export async function getProperty(id: string) {
  return service.get(id);
}

export async function getProperties(page: number = 1, search = '') {
  return service.getAll({ page, search });
}

export async function createProperty(property: Property) {
  return service.create(property);
}

export async function updateProperty(id: string, property: Property) {
  return service.update(id, property);
}

export async function deleteProperty(id: string) {
  return service.delete(id);
}
