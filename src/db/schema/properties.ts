import { integer, sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const properties = sqliteTable('properties', {
  id: text().primaryKey(),
  acceptanceFee: real().notNull(),
  acceptanceDeadline: integer({ mode: 'timestamp' }).notNull(),
  registrationDate: integer({ mode: 'timestamp' }).notNull(),
  orientationDate: integer({ mode: 'timestamp' }).notNull(),
});
