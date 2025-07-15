import { relations } from 'drizzle-orm';
import {
  users,
  accounts,
  sessions,
  students,
  studentInfo,
  programs,
  faculties,
  calls,
  nameChanges,
  studentHistory,
  pageVisits,
  letterDownloads,
} from './schema';

export const usersRelations = relations(users, ({ many }) => ({
  accounts: many(accounts),
  sessions: many(sessions),
  callsMade: many(calls),
  historyActions: many(studentHistory),
}));

export const accountsRelations = relations(accounts, ({ one }) => ({
  user: one(users, {
    fields: [accounts.userId],
    references: [users.id],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export const studentInfoRelations = relations(studentInfo, ({ one }) => ({
  student: one(students, {
    fields: [studentInfo.studentId],
    references: [students.id],
  }),
}));

export const studentsRelations = relations(students, ({ one, many }) => ({
  program: one(programs, {
    fields: [students.programId],
    references: [programs.id],
  }),
  studentInfo: one(studentInfo, {
    fields: [students.id],
    references: [studentInfo.studentId],
  }),
  calls: many(calls),
  nameChanges: many(nameChanges),
  history: many(studentHistory),
  pageVisits: many(pageVisits),
  letterDownloads: many(letterDownloads),
}));

export const programsRelations = relations(programs, ({ one, many }) => ({
  faculty: one(faculties, {
    fields: [programs.facultyId],
    references: [faculties.id],
  }),
  students: many(students),
}));

export const facultiesRelations = relations(faculties, ({ many }) => ({
  programs: many(programs),
}));

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

export const nameChangesRelations = relations(nameChanges, ({ one }) => ({
  student: one(students, {
    fields: [nameChanges.studentId],
    references: [students.id],
  }),
}));

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

export const pageVisitsRelations = relations(pageVisits, ({ one }) => ({
  student: one(students, {
    fields: [pageVisits.studentId],
    references: [students.id],
  }),
}));

export const letterDownloadsRelations = relations(
  letterDownloads,
  ({ one }) => ({
    student: one(students, {
      fields: [letterDownloads.studentId],
      references: [students.id],
    }),
  }),
);
