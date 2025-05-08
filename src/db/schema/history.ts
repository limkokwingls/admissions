import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { students } from './students';
import { users } from './auth';

export const studentHistory = sqliteTable(
  'student_history',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    action: text().notNull(),
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
