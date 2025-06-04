import BaseRepository, { QueryOptions } from '@/server/base/BaseRepository';
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

  override async query(options: QueryOptions<typeof calls>) {
    const criteria = this.buildQueryCriteria(options);

    const items = await db.query.calls.findMany({
      ...criteria,
      with: { student: true },
    });

    return await this.createPaginatedResult(items, criteria);
  }
}

export const callsRepository = new CallRepository();
