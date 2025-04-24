import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { sql } from 'drizzle-orm';

export const users = sqliteTable('users', {
  id: text({ length: 21 })
    .$defaultFn(() => nanoid())
    .primaryKey(),
  name: text(),
  email: text(),
  image: text(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});
