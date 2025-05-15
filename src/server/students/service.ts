import { students } from '@/db/schema';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';
import StudentRepository from './repository';

type Student = typeof students.$inferInsert;

class StudentService {
  constructor(private readonly repository = new StudentRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), ['all']);
  }

  async getAll(params: QueryOptions<typeof students>) {
    return withAuth(async () => this.repository.query(params), ['all']);
  }

  async create(data: Student) {
    return withAuth(async () => this.repository.create(data), []);
  }

  async update(id: string, data: Student) {
    return withAuth(async () => this.repository.update(id, data), ['registry']);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }

  async getAcceptedByFaculty(params: {
    facultyId?: number;
    programId?: number;
    page: number;
    size?: number;
  }) {
    const { facultyId, programId, page = 1, size = 20 } = params;
    return withAuth(
      async () =>
        this.repository.getAcceptedByFaculty({
          facultyId,
          programId,
          page,
          size,
        }),
      ['all'],
    );
  }
}

export const studentsService = new StudentService();
