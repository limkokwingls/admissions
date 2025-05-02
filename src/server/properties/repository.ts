import BaseRepository from '@/server/base/BaseRepository';
import { properties } from '@/db/schema'

export default class PropertyRepository extends BaseRepository<
  typeof properties,
  'id'
> {
  constructor() {
    super(properties, 'id');
  }
}

export const propertiesRepository = new PropertyRepository();