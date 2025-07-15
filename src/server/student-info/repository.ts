import BaseRepository from '@/server/base/BaseRepository';
import { studentInfo } from '@/db/schema';

export default class StudentInfoRepository extends BaseRepository<
  typeof studentInfo,
  'id'
> {
  constructor() {
    super(studentInfo, 'id');
  }
}

export const studentInfosRepository = new StudentInfoRepository();
