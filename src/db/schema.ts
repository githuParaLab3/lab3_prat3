import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const DATABASE_NAME = "labdbj";
export const TABLENAME_USER = "user";
export const usersTable = sqliteTable(TABLENAME_USER, {
id: text().primaryKey(),
cidade:text().notNull(),
estado: text().notNull(),
habitantes: integer().notNull(),
});