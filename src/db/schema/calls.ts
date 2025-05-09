import {
  sqliteTable,
  integer,
  text,
  primaryKey,
  index,
} from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { sql } from 'drizzle-orm';
import { students } from './students';
import { users } from './auth';

export const callStatusEnum = ['pending', 'accepted', 'rejected'] as const;

export type CallStatus = (typeof callStatusEnum)[number];

export const calls = sqliteTable(
  'calls',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    callCount: integer().notNull().default(1),
    calledBy: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    status: text({ enum: callStatusEnum }).notNull().default('pending'),
    lastCallAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => {
    return {
      studentIdIdx: index('calls_student_id_idx').on(table.studentId),
    };
  },
);
