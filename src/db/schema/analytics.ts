import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { students } from './students';

export const pageVisits = sqliteTable(
  'page_visits',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    visitCount: integer().notNull().default(1),
    lastVisitedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => {
    return {
      studentIdIdx: index('page_visits_student_id_idx').on(table.studentId),
    };
  },
);

export const letterDownloads = sqliteTable(
  'letter_downloads',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    downloadCount: integer().notNull().default(1),
    lastDownloadedAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  },
  (table) => {
    return {
      studentIdIdx: index('letter_downloads_student_id_idx').on(table.studentId),
    };
  },
);

export const pageVisitsRelations = relations(pageVisits, ({ one }) => ({
  student: one(students, {
    fields: [pageVisits.studentId],
    references: [students.id],
  }),
}));

export const letterDownloadsRelations = relations(letterDownloads, ({ one }) => ({
  student: one(students, {
    fields: [letterDownloads.studentId],
    references: [students.id],
  }),
}));
