import { calls, CallStatus } from '@/db/schema';
import CallRepository from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';
import { auth } from '@/auth';
import { eq } from 'drizzle-orm';

type Call = typeof calls.$inferInsert;

class CallService {
  constructor(private readonly repository = new CallRepository()) {}

  async first() {
    return withAuth(async () => this.repository.findFirst(), ['registry']);
  }

  async get(id: string) {
    return withAuth(async () => this.repository.findById(id), ['all']);
  }

  async getByStudentId(studentId: string) {
    return withAuth(
      async () => this.repository.findByStudentId(studentId),
      ['all'],
    );
  }

  async getCountByStatus(status: CallStatus) {
    return withAuth(
      async () => this.repository.count(eq(calls.status, status)),
      ['registry'],
    );
  }

  async getAll(params: QueryOptions<typeof calls>) {
    return withAuth(async () => this.repository.query(params), ['registry']);
  }

  async create(data: Call) {
    return withAuth(async () => this.repository.create(data), ['registry']);
  }

  async update(id: string, data: Call) {
    return withAuth(async () => this.repository.update(id, data), ['registry']);
  }

  async delete(id: string) {
    return withAuth(async () => this.repository.delete(id), []);
  }
  async count() {
    return withAuth(async () => this.repository.count(), ['registry']);
  }
  async updateCallStatus(id: string, status: CallStatus) {
    return withAuth(async () => {
      const session = await auth();
      const userId = session?.user?.id;

      if (!userId) {
        throw new Error('User not authenticated');
      }

      const call = await this.repository.findById(id);
      if (!call) {
        throw new Error('Call not found');
      }

      const updatedData = {
        ...call,
        status,
        calledBy: userId,
        lastCallAt: new Date(),
      };

      return this.repository.update(id, updatedData);
    }, ['registry']);
  }

  async incrementCallCount(id: string) {
    return withAuth(async () => {
      const session = await auth();
      const userId = session?.user?.id;

      if (!userId) {
        throw new Error('User not authenticated');
      }

      const call = await this.repository.findById(id);
      if (!call) {
        throw new Error('Call not found');
      }

      const updatedData = {
        ...call,
        callCount: (call.callCount || 0) + 1,
        calledBy: userId,
        lastCallAt: new Date(),
      };

      return this.repository.update(id, updatedData);
    }, ['registry']);
  }
}

export const callsService = new CallService();
