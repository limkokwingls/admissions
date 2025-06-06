import { users } from '@/db/schema';
import UserRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type User = typeof users.$inferInsert;

class UserService {
  constructor(private readonly repository = new UserRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), []);
  }

  async getAll(params: QueryOptions<typeof users>) {
    return withAuth(async () => this.repository.query(params), []);
  }

  async create(data: User) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: User) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const usersService = new UserService();
