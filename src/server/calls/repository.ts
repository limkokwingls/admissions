import BaseRepository from '@/server/base/BaseRepository';
import { calls } from '@/db/schema';
import { eq } from 'drizzle-orm';
import { db } from '@/db';

export default class CallRepository extends BaseRepository<typeof calls, 'id'> {
  constructor() {
    super(calls, 'id');
  }

  override async findById(id: string) {
    return db.query.calls.findFirst({
      where: eq(calls.id, id),
      with: { student: true },
    });
  }
}

export const callsRepository = new CallRepository();
