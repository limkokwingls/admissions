import { studentInfo } from '@/db/schema';
import StudentInfoRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type StudentInfo = typeof studentInfo.$inferInsert;

class StudentInfoService {
  constructor(private readonly repository = new StudentInfoRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), []);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), ['all']);
  }

  async getAll(params: QueryOptions<typeof studentInfo>) {
    return withAuth(async () => this.repository.query(params), ['registry']);
  }

  async create(studentId: string, data: StudentInfo) {
    return withAuth(
      async () => this.repository.upsert(studentId, data),
      ['all'],
    );
  }

  async update(id: string, data: Partial<StudentInfo>) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const studentInfoService = new StudentInfoService();
