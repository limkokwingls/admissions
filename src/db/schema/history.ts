import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { users } from './auth';
import { students } from './students';

const actionsEnum = [
  'acceptance_changed',
  'admission_printed',
  'name_change_printed',
  'status_changed',
] as const;
export type ActionType = (typeof actionsEnum)[number];

export const studentHistory = sqliteTable(
  'student_history',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    action: text({ enum: actionsEnum }).notNull(),
    oldValue: text(),
    newValue: text(),
    performedBy: text()
      .notNull()
      .references(() => users.id, { onDelete: 'cascade' }),
    performedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => {
    return {
      studentIdIdx: index('student_history_student_id_idx').on(table.studentId),
      actionIdx: index('student_history_action_idx').on(table.action),
    };
  },
);

export const studentHistoryRelations = relations(studentHistory, ({ one }) => ({
  student: one(students, {
    fields: [studentHistory.studentId],
    references: [students.id],
  }),
  performedBy: one(users, {
    fields: [studentHistory.performedBy],
    references: [users.id],
  }),
}));
