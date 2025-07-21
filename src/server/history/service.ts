import { ActionType, studentHistory } from '@/db/schema/history';
import withAuth from '@/server/base/withAuth';
import { QueryOptions } from '../base/BaseRepository';
import { studentHistoryRepository } from './repository';

type StudentHistory = typeof studentHistory.$inferInsert;

class HistoryService {
  constructor(private readonly studentHistoryRepo = studentHistoryRepository) {}

  async getHistoryItem(id: string) {
    return withAuth(async () => this.studentHistoryRepo.findById(id), []);
  }

  async getHistoryByStudentId(studentId: string) {
    return withAuth(
      async () => this.studentHistoryRepo.findByStudentId(studentId),
      ['registry'],
    );
  }

  async getHistoryByAction(action: ActionType) {
    return withAuth(
      async () => this.studentHistoryRepo.findByAction(action),
      ['registry'],
    );
  }

  async getHistoryByStudentIdAndAction(studentId: string, action: ActionType) {
    return withAuth(
      async () =>
        this.studentHistoryRepo.findByStudentIdAndAction(studentId, action),
      ['registry'],
    );
  }

  async getAllHistory(params: QueryOptions<typeof studentHistory>) {
    return withAuth(
      async () => this.studentHistoryRepo.query(params),
      ['registry'],
    );
  }

  async createHistoryEntry(data: StudentHistory) {
    return withAuth(
      async () => this.studentHistoryRepo.create(data),
      ['registry'],
    );
  }

  async trackAcceptanceChange(
    studentId: string,
    oldValue: boolean,
    newValue: boolean,
    performedBy: string,
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
    performedBy: string,
    letterType?: string,
  ) {
    return this.createHistoryEntry({
      studentId,
      action: 'admission_printed',
      performedBy,
      // Store the letter type in the newValue field if provided
      newValue: letterType ? letterType : undefined,
    });
  }

  async trackNameChangePrinted(
    studentId: string,
    performedBy: string,
    nameChangeId: string,
  ) {
    return this.createHistoryEntry({
      studentId,
      action: 'name_change_printed',
      performedBy,
      // Store the name change ID in the newValue field
      newValue: nameChangeId,
    });
  }

  async trackStatusChange(
    studentId: string,
    oldStatus: string,
    newStatus: string,
    performedBy: string,
  ) {
    return this.createHistoryEntry({
      studentId,
      action: 'status_changed',
      oldValue: oldStatus,
      newValue: newStatus,
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
