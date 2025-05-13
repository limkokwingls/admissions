import { nameChanges } from '@/db/schema';
import NameChangeRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type NameChange = typeof nameChanges.$inferInsert;

class NameChangeService {
  constructor(private readonly repository = new NameChangeRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async getAll(params: QueryOptions<typeof nameChanges>) {
    return withAuth(async () => this.repository.query(params), []);
  }

  async create(data: NameChange) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: NameChange) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const nameChangesService = new NameChangeService();
