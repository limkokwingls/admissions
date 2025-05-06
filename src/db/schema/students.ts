import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { programs } from './programs';

export const statusEnum = ['Admitted', 'Wait Listed', 'DQ'] as const;

export const students = sqliteTable(
  'students',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    no: integer().notNull(),
    surname: text().notNull(),
    names: text().notNull(),
    candidateNo: text(),
    phoneNumber: text().notNull(),
    status: text({ enum: statusEnum }).notNull(),
    programId: integer()
      .notNull()
      .references(() => programs.id, { onDelete: 'cascade' }),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => {
    return {
      surnameIdx: index('surname_idx').on(table.surname),
      namesIdx: index('names_idx').on(table.names),
      candidateNoIdx: index('candidate_no_idx').on(table.candidateNo),
      phoneNumberIdx: index('phone_number_idx').on(table.phoneNumber),
    };
  },
);

export const studentsRelations = relations(students, ({ one }) => ({
  program: one(programs, {
    fields: [students.programId],
    references: [programs.id],
  }),
}));
