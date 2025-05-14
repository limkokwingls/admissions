import { faculties } from '@/db/schema';
import FacultyRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type Faculty = typeof faculties.$inferInsert;

class FacultyService {
  constructor(private readonly repository = new FacultyRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: number) {
    return withAuth(async () => this.repository.findById(id), ['registry']);
  }

  async findAll(params: QueryOptions<typeof faculties>) {
    return withAuth(async () => this.repository.query(params), ['registry']);
  }

  async create(data: Faculty) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: number, data: Faculty) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: number) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const facultiesService = new FacultyService();
