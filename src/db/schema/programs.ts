import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';

export const programLevels = ['certificate', 'diploma', 'degree'] as const;

export const faculties = sqliteTable('faculties', {
  id: integer('id').primaryKey(),
  code: text().notNull(),
  name: text().notNull(),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export const facultyRelations = relations(faculties, ({ many }) => ({
  programs: many(programs),
}));

//TODO: -1	BHRA	BA in Human Resource Management (ADV),
//TODO: I should probably make code the primary key sot that BHRA and BHR can have the same id
export const programs = sqliteTable('programs', {
  id: integer('id').primaryKey(),
  structureId: integer(),
  code: text().notNull(),
  name: text().notNull(),
  level: text({ enum: programLevels }).notNull(),
  facultyId: integer()
    .notNull()
    .references(() => faculties.id, { onDelete: 'cascade' }),
  createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
  updatedAt: integer({ mode: 'timestamp' }),
});

export const programsRelations = relations(programs, ({ one }) => ({
  faculty: one(faculties, {
    fields: [programs.facultyId],
    references: [faculties.id],
  }),
}));
