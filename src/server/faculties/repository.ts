import BaseRepository from '@/server/base/BaseRepository';
import { faculties } from '@/db/schema'

export default class FacultyRepository extends BaseRepository<
  typeof faculties,
  'id'
> {
  constructor() {
    super(faculties, 'id');
  }
}

export const facultiesRepository = new FacultyRepository();