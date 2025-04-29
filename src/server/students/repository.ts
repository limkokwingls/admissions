import BaseRepository, { QueryOptions } from '@/server/base/BaseRepository';
import { students } from '@/db/schema';
import { db } from '@/db';
import { and, eq, like, or, sql } from 'drizzle-orm';

export default class StudentRepository extends BaseRepository<
  typeof students,
  'id'
> {
  constructor() {
    super(students, 'id');
  }

  override async query(params: QueryOptions<typeof students>) {
    let filter = undefined;

    if (params.search) {
      const searchTerms = params.search.trim().split(/\s+/);

      const conditions = searchTerms.map((term) => {
        const fuzzyTerm = term.split('').join('%');

        return or(
          sql`LOWER(${students.surname}) LIKE LOWER(${'%' + fuzzyTerm + '%'})`,
          sql`LOWER(${students.names}) LIKE LOWER(${'%' + fuzzyTerm + '%'})`
        );
      });

      if (conditions.length > 0) {
        filter = conditions.length === 1 ? conditions[0] : and(...conditions);
      }
    }

    const criteria = this.buildQueryCriteria({
      ...params,
      filter,
    });

    const data = await db.query.students.findMany({
      ...criteria,
    });

    return this.createPaginatedResult(data, criteria);
  }
}

export const studentsRepository = new StudentRepository();
