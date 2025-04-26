import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const students = sqliteTable('students', {
  id: text()
    .$defaultFn(() => nanoid())
    .primaryKey(),
  no: integer().notNull(),
  surname: text().notNull(),
  names: text().notNull(),
  contact: text().notNull(),
  candidateNo: text().notNull(),
  status: text().notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});
