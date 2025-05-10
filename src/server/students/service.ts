import { students } from '@/db/schema';
import { confirm } from '@inquirer/prompts';
import StudentRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';
import { exit } from 'process';
import chalk from 'chalk';

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

    if (!existingStudent && !data.phoneNumber) {
      console.log(
        chalk.red(
          `No phone number provided for student: ${data.surname} ${data.names}, Did you import the correct sheet?`,
        ),
      );

      const shouldContinue = await confirm({
        message: 'Do you want to continue?',
        default: false,
      });

      if (!shouldContinue) {
        process.exit(1);
      }
    }

    if (existingStudent) {
      const updateData = {
        ...existingStudent,
        no: data.no,
        status: data.status,
      };
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
