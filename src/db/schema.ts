import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
export const DATABASE_NAME = "lab3db";
export const TABLENAME_USER = "user";
export const usersTable = sqliteTable(TABLENAME_USER, {
id: text().primaryKey(),
estado: text().notNull(),
habitantes: integer().notNull(),
cidade:text().unique()
});