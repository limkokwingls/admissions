import { db } from '@/db';
import { studentHistory } from '@/db/schema/history';
import { eq, desc } from 'drizzle-orm';
import BaseRepository, { QueryOptions } from '../base/BaseRepository';

class StudentHistoryRepository extends BaseRepository<typeof studentHistory, 'id'> {
  constructor() {
    super(studentHistory, 'id');
  }

  async findByStudentId(studentId: string) {
    return db.select().from(studentHistory)
      .where(eq(studentHistory.studentId, studentId))
      .orderBy(desc(studentHistory.performedAt));
  }

  async findByAction(action: string) {
    return db.select().from(studentHistory)
      .where(eq(studentHistory.action, action))
      .orderBy(desc(studentHistory.performedAt));
  }

  async findByStudentIdAndAction(studentId: string, action: string) {
    return db.select().from(studentHistory)
      .where(
        eq(studentHistory.studentId, studentId) && 
        eq(studentHistory.action, action)
      )
      .orderBy(desc(studentHistory.performedAt));
  }
}

export const studentHistoryRepository = new StudentHistoryRepository();
