import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

/**
 * Database connection singleton.
 * ──────────────────────────────
 * Uses postgres.js driver with Drizzle ORM.
 * The connection string comes from the DATABASE_URL env variable.
 */

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// For query purposes (connection pooling compatible)
const client = postgres(connectionString, {
  prepare: false, // Required for Supabase connection pooling (pgBouncer)
});

export const db = drizzle(client, { schema });
