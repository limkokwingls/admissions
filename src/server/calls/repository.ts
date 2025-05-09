import BaseRepository from '@/server/base/BaseRepository';
import { calls } from '@/db/schema'

export default class CallRepository extends BaseRepository<
  typeof calls,
  'id'
> {
  constructor() {
    super(calls, 'id');
  }
}

export const callsRepository = new CallRepository();