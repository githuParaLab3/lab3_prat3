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

async function DZSQLiteSelect<T extends {}>
(table:SQLiteTable,dbname:string=DATABASE_NAME):Promise<T[]>
{
const conn = DZSQLiteConnect(dbname);
const result = await conn.select().from(table);
const rowset:T[]=[];
result.forEach((item)=>rowset.push(item as T));
return rowset;
}

async function DZSQLiteDelete<T extends {}>(
    table: SQLiteTable,
    whereCondition: any, 
    dbname: string = DATABASE_NAME
) {
    const conn = DZSQLiteConnect(dbname);
    await conn.delete(table).where(whereCondition);
}

async function DZSQLiteUpdate<T extends {}>(
    table: SQLiteTable,
    data: T,
    whereCondition: any, 
    dbname: string = DATABASE_NAME
) {
    const conn = DZSQLiteConnect(dbname);
    await conn.update(table).set(data).where(whereCondition);
}

export {DZSQLiteInsert,DZSQLiteSelect, DZSQLiteDelete, DZSQLiteUpdate}