import { properties } from '@/db/schema';
import PropertyRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type Property = typeof properties.$inferInsert;

class PropertyService {
  constructor(private readonly repository = new PropertyRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async getAll(params: QueryOptions<typeof properties>) {
    return withAuth(async () => this.repository.query(params), []);
  }

  async create(data: Property) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: Property) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const propertiesService = new PropertyService();
