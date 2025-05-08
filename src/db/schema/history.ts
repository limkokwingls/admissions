import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { students } from './students';

export const studentHistory = sqliteTable(
  'student_history',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    action: text().notNull(), // 'acceptance_changed', 'admission_printed'
    oldValue: text(), // For acceptance changes: 'true' or 'false'
    newValue: text(), // For acceptance changes: 'true' or 'false'
    performedBy: text().notNull(), // User ID or email who performed the action
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
}));
