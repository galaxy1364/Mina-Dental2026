import { drizzle } from 'drizzle-orm/expo-sqlite';
import { getDb } from './sqlite';
import { schema } from './schema';

/** Typed Drizzle client over the local SQLite database. */
export const db = drizzle(getDb(), { schema });
export type DrizzleDb = typeof db;
