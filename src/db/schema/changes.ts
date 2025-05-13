import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';
import { students } from './students';
import { nanoid } from 'nanoid';
import { sql } from 'drizzle-orm';
import { relations } from 'drizzle-orm';

export const nameChanges = sqliteTable('name_changes', {
  id: text()
    .$defaultFn(() => nanoid())
    .primaryKey(),
  studentId: text()
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  oldName: text(),
  newName: text(),
  changedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
});

export const nameChangeRelations = relations(nameChanges, ({ one }) => ({
  student: one(students, {
    fields: [nameChanges.studentId],
    references: [students.id],
  }),
}));
