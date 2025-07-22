import { relations, sql } from 'drizzle-orm';
import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { nanoid } from 'nanoid';
import { programs } from './programs';

export const statusEnum = ['Admitted', 'Wait Listed', 'Private', 'DQ'] as const;

export const sponsors = ['Higher Life', 'Other'] as const;

export const students = sqliteTable(
  'students',
  {
    id: text()
      .$defaultFn(() => nanoid())
      .primaryKey(),
    no: integer().notNull().default(0),
    surname: text().notNull(),
    names: text().notNull(),
    stdNo: integer(),
    candidateNo: text(),
    receiptNo: text(),
    sponsor: text({ enum: sponsors }),
    phoneNumber: text().notNull(),
    status: text({ enum: statusEnum }).notNull(),
    accepted: integer({ mode: 'boolean' }).notNull().default(false),
    reference: text(),
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
      receiptNoIdx: index('receipt_no_idx').on(table.receiptNo),
      phoneNumberIdx: index('phone_number_idx').on(table.phoneNumber),
      referenceIdx: index('reference_idx').on(table.reference),
    };
  },
);

export const studentsRelations = relations(students, ({ one }) => ({
  program: one(programs, {
    fields: [students.programId],
    references: [programs.id],
  }),
}));

export const nextOfKinRelationships = [
  'Father',
  'Mother',
  'Brother',
  'Sister',
  'Spouse',
  'Child',
  'Other',
] as const;

export const maritalStatuses = [
  'Single',
  'Married',
  'Divorced',
  'Widowed',
  'Other',
] as const;

export const genders = ['Male', 'Female'] as const;
export const religions = [
  'Christian',
  'Muslim',
  'Hindu',
  'Buddhist',
  'Other',
] as const;

export const studentInfo = sqliteTable(
  'student_info',
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => nanoid()),
    studentId: text()
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' }),
    nationalId: text().notNull(),
    reference: text(),
    name: text().notNull(),
    email: text().notNull().unique(),
    phone1: text().notNull(),
    phone2: text(),
    religion: text({ enum: religions }).notNull(),
    dateOfBirth: integer({ mode: 'timestamp' }).notNull(),
    gender: text({ enum: genders }).notNull(),
    maritalStatus: text({ enum: maritalStatuses }).notNull(),
    birthPlace: text().notNull(),
    homeTown: text().notNull(),
    highSchool: text().notNull(),
    nextOfKinName: text().notNull(),
    nextOfKinPhone: text().notNull(),
    nextOfKinRelationship: text({ enum: nextOfKinRelationships }).notNull(),
    paid: integer({ mode: 'boolean' }).notNull().default(false),
    createdAt: integer({ mode: 'timestamp' }).default(sql`(unixepoch())`),
    updatedAt: integer({ mode: 'timestamp' }),
  },
  (table) => ({
    emailIdx: index('student_email_idx').on(table.email),
    nationalIdIdx: index('student_national_id_idx').on(table.nationalId),
    nameIdx: index('student_name_idx').on(table.name),
  }),
);
