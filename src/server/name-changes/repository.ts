import BaseRepository from '@/server/base/BaseRepository';
import { nameChanges } from '@/db/schema';
import { db } from '@/db';
import { eq } from 'drizzle-orm';

export default class NameChangeRepository extends BaseRepository<
  typeof nameChanges,
  'id'
> {
  constructor() {
    super(nameChanges, 'id');
  }

  async findByStudent(studentId: string) {
    return db.query.nameChanges.findFirst({
      where: eq(nameChanges.studentId, studentId),
    });
  }
}

export const nameChangesRepository = new NameChangeRepository();
