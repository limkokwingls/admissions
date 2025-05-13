import { nameChanges } from '@/db/schema';
import NameChangeRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type NameChange = typeof nameChanges.$inferInsert;

class NameChangeService {
  constructor(private readonly repository = new NameChangeRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), ['registry']);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), ['registry']);
  }

  async getAll(params: QueryOptions<typeof nameChanges>) {
    return withAuth(async () => this.repository.query(params), ['registry']);
  }

  async create(data: NameChange) {
    return withAuth(async () => this.repository.create(data), ['registry']);
  }

  async update(id: string, data: NameChange) {
    return withAuth(async () => this.repository.update(id, data), ['registry']);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), ['registry']);
  }

  async count() {
    return withAuth(async () => this.repository.count(), ['registry']);
  }
}

export const nameChangesService = new NameChangeService();
