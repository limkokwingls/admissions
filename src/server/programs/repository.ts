import BaseRepository from '@/server/base/BaseRepository';
import { programs } from '@/db/schema';
import { db } from '@/db';
import { sql } from 'drizzle-orm';

export default class ProgramRepository extends BaseRepository<
  typeof programs,
  'id'
> {
  constructor() {
    super(programs, 'id');
  }

  async findByName(programName: string) {
    const result = await db.query.programs.findFirst({
      where: sql`LOWER(${programs.name}) = LOWER(${programName.trim()})`,
    });
    return result?.id;
  }
}

export const programsRepository = new ProgramRepository();
