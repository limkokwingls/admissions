import { sqliteTable, text, real } from 'drizzle-orm/sqlite-core';

export const properties = sqliteTable('properties', {
  id: text().primaryKey(),
  acceptanceFee: real().notNull(),
  acceptanceDeadline: text().notNull(),
  registrationDateFrom: text().notNull(),
  registrationDateTo: text().notNull(),
  privatePaymentDateFrom: text(),
  privatePaymentDateTo: text(),
});
