import { studentHistory } from '@/db/schema/history';
import { studentHistoryRepository } from './repository';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';

type StudentHistory = typeof studentHistory.$inferInsert;

class HistoryService {
  constructor(
    private readonly studentHistoryRepo = studentHistoryRepository
  ) {}

  async getHistoryItem(id: string) {
    return withAuth(async () => this.studentHistoryRepo.findById(id), []);
  }

  async getHistoryByStudentId(studentId: string) {
    return withAuth(async () => this.studentHistoryRepo.findByStudentId(studentId), []);
  }

  async getHistoryByAction(action: string) {
    return withAuth(async () => this.studentHistoryRepo.findByAction(action), []);
  }

  async getHistoryByStudentIdAndAction(studentId: string, action: string) {
    return withAuth(async () => this.studentHistoryRepo.findByStudentIdAndAction(studentId, action), []);
  }

  async getAllHistory(params: QueryOptions<typeof studentHistory>) {
    return withAuth(async () => this.studentHistoryRepo.query(params), []);
  }

  async createHistoryEntry(data: StudentHistory) {
    return withAuth(async () => this.studentHistoryRepo.create(data), []);
  }

  async trackAcceptanceChange(
    studentId: string, 
    oldValue: boolean, 
    newValue: boolean, 
    performedBy: string
  ) {
    return this.createHistoryEntry({
      studentId,
      action: 'acceptance_changed',
      oldValue: oldValue.toString(),
      newValue: newValue.toString(),
      performedBy,
    });
  }

  async trackAdmissionPrinted(
    studentId: string,
    performedBy: string
  ) {
    return this.createHistoryEntry({
      studentId,
      action: 'admission_printed',
      performedBy,
    });
  }

  async updateHistoryEntry(id: string, data: Partial<StudentHistory>) {
    return withAuth(async () => this.studentHistoryRepo.update(id, data), []);
  }

  async deleteHistoryEntry(id: string) {
    return withAuth(async () => this.studentHistoryRepo.delete(id), []);
  }
}

export const historyService = new HistoryService();
