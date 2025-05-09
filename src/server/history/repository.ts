import { db } from '@/db';
import { ActionType, studentHistory } from '@/db/schema/history';
import { eq, desc } from 'drizzle-orm';
import BaseRepository from '../base/BaseRepository';

class StudentHistoryRepository extends BaseRepository<
  typeof studentHistory,
  'id'
> {
  constructor() {
    super(studentHistory, 'id');
  }

  async findByStudentId(studentId: string) {
    return db.query.studentHistory.findMany({
      where: eq(studentHistory.studentId, studentId),
      with: {
        performedBy: true,
      },
      orderBy: desc(studentHistory.performedAt),
    });
  }

  async findByAction(action: ActionType) {
    return db
      .select()
      .from(studentHistory)
      .where(eq(studentHistory.action, action))
      .orderBy(desc(studentHistory.performedAt));
  }

  async findByStudentIdAndAction(studentId: string, action: ActionType) {
    return db
      .select()
      .from(studentHistory)
      .where(
        eq(studentHistory.studentId, studentId) &&
          eq(studentHistory.action, action),
      )
      .orderBy(desc(studentHistory.performedAt));
  }
}

export const studentHistoryRepository = new StudentHistoryRepository();
