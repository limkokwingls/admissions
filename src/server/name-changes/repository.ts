import BaseRepository from '@/server/base/BaseRepository';
import { nameChanges } from '@/db/schema'

export default class NameChangeRepository extends BaseRepository<
  typeof nameChanges,
  'id'
> {
  constructor() {
    super(nameChanges, 'id');
  }
}

export const nameChangesRepository = new NameChangeRepository();