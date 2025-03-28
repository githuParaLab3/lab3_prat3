import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteTable } from 'drizzle-orm/sqlite-core';
import { DATABASE_NAME } from './schema';
import { openDatabaseSync } from 'expo-sqlite';
const DZSQLiteConnect = (dbname:string)=>{
const db = openDatabaseSync(dbname);
const conn = drizzle(db);
return conn;
}
async function DZSQLiteInsert<T extends {}>
(table:SQLiteTable,data:T,dbname:string=DATABASE_NAME)
{
const conn = DZSQLiteConnect(dbname);
await conn.insert(table).values(data);
}

async function DZSQLiteDelete<T extends {}>
    (table: SQLiteTable, whereClause: any, dbname: string = DATABASE_NAME) {
    const conn = DZSQLiteConnect(dbname);
    await conn.delete(table).where(whereClause);
}

async function DZSQLiteUpdate<T extends {}>
    (table: SQLiteTable, data: Partial<T>, whereClause: any, dbname: string = DATABASE_NAME) {
    const conn = DZSQLiteConnect(dbname);
    await conn.update(table).set(data).where(whereClause);
}

async function DZSQLiteSelect<T extends {}>
(table:SQLiteTable,dbname:string=DATABASE_NAME):Promise<T[]>
{
const conn = DZSQLiteConnect(dbname);
const result = await conn.select().from(table);
const rowset:T[]=[];
result.forEach((item)=>rowset.push(item as T));
return rowset;
}
export {DZSQLiteInsert,DZSQLiteSelect, DZSQLiteDelete, DZSQLiteUpdate, DZSQLiteConnect}