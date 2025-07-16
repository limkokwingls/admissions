import BaseRepository from '@/server/base/BaseRepository';
import { studentInfo } from '@/db/schema';
import { db } from '@/db';

export default class StudentInfoRepository extends BaseRepository<
  typeof studentInfo,
  'id'
> {
  constructor() {
    super(studentInfo, 'id');
  }

  async upsert(studentId: string, data: typeof studentInfo.$inferInsert) {
    const [result] = await db
      .insert(studentInfo)
      .values(data)
      .onConflictDoUpdate({
        target: [studentInfo.id],
        set: { ...data, studentId },
      })
      .returning();
    return result;
  }
}

export const studentInfosRepository = new StudentInfoRepository();
