import { sqliteTable, integer, text, index } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { sql, relations } from 'drizzle-orm';
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
    callCount: integer(),
    calledBy: text().references(() => users.id, { onDelete: 'cascade' }),
    status: text({ enum: callStatusEnum }).notNull().default('pending'),
    lastCallAt: integer({ mode: 'timestamp' }),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => {
    return {
      studentIdIdx: index('calls_student_id_idx').on(table.studentId),
    };
  },
);

export const callsRelations = relations(calls, ({ one }) => ({
  student: one(students, {
    fields: [calls.studentId],
    references: [students.id],
  }),
  calledByUser: one(users, {
    fields: [calls.calledBy],
    references: [users.id],
  }),
}));
