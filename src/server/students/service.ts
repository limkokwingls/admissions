import { students } from '@/db/schema';
import StudentRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

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

  async createOrUpdate(data: Student) {
    const existingStudent = await this.repository.findByUniqueIdentifiers(data);

    if (existingStudent) {
      const updateData = {
        ...data,
        id: existingStudent.id,
      };
      if (!existingStudent.no) {
        updateData.no = data.no;
      }
      if (!existingStudent.phoneNumber) {
        updateData.phoneNumber = data.phoneNumber;
      }
      return this.repository.update(existingStudent.id, updateData);
    } else {
      return this.repository.create(data);
    }
  }

  async update(id: string, data: Student) {
    return withAuth(async () => this.repository.update(id, data), []);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }

  async count() {
    return withAuth(async () => this.repository.count(), []);
  }
}

export const studentsService = new StudentService();
