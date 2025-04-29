import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';

export const statusEnum = ['Admitted', 'Wait Listed', 'DQ'] as const;

export const students = sqliteTable('students', {
  id: text()
    .$defaultFn(() => nanoid())
    .primaryKey(),
  no: integer().notNull(),
  surname: text().notNull(),
  names: text().notNull(),
  candidateNo: text().notNull(),
  phoneNumber: text().notNull(),
  status: text({ enum: statusEnum }).notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});
