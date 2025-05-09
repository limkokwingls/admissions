import { calls } from '@/db/schema';
import CallRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type Call = typeof calls.$inferInsert;

class CallService {
  constructor(private readonly repository = new CallRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async getAll(params: QueryOptions<typeof calls>) {
    return withAuth(async () => this.repository.query(params), []);
  }

  async create(data: Call) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: Call) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const callsService = new CallService();
