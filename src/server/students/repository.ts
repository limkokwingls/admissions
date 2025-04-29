import BaseRepository, { QueryOptions } from '@/server/base/BaseRepository';
import { students } from '@/db/schema';
import { db } from '@/db';
import { and, eq, like } from 'drizzle-orm';

export default class StudentRepository extends BaseRepository<
  typeof students,
  'id'
> {
  constructor() {
    super(students, 'id');
  }

  override async query(params: QueryOptions<typeof students>) {
    const criteria = this.buildQueryCriteria({
      ...params,
      filter: and(like(students.surname, `%${params.search}%`)),
    });
    const data = await db.query.students.findMany({
      ...criteria,
    });

    return this.createPaginatedResult(data, criteria);
  }
}

export const studentsRepository = new StudentRepository();
