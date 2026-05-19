/**
 * Admin User Seed Script
 * ──────────────────────
 * Creates an initial admin user with a hashed password.
 *
 * Usage:
 *   npx tsx lib/db/seed-admin.ts
 *
 * Environment:
 *   DATABASE_URL must be set in .env
 */

import "dotenv/config";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import bcrypt from "bcryptjs";
import { adminUsers } from "./schema";
import { eq } from "drizzle-orm";

const DEFAULT_USERNAME = "admin";
const DEFAULT_PASSWORD = "XyzAbc123";

async function main() {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("❌ DATABASE_URL environment variable is not set");
    process.exit(1);
  }

  const client = postgres(connectionString, { prepare: false });
  const db = drizzle(client);

  // Check if admin already exists
  const existing = await db
    .select()
    .from(adminUsers)
    .where(eq(adminUsers.username, DEFAULT_USERNAME))
    .limit(1);

  if (existing.length > 0) {
    console.log(`⚠️  Admin user "${DEFAULT_USERNAME}" already exists. Skipping.`);
    await client.end();
    return;
  }

  // Hash the password (bcrypt with 12 rounds)
  const passwordHash = await bcrypt.hash(DEFAULT_PASSWORD, 12);

  // Insert admin user
  await db.insert(adminUsers).values({
    username: DEFAULT_USERNAME,
    passwordHash,
  });

  console.log(`✅ Admin user created successfully`);
  console.log(`   Username: ${DEFAULT_USERNAME}`);
  console.log(`   Password: ${DEFAULT_PASSWORD}`);
  console.log(`\n⚠️  Change the default password after first login!`);

  await client.end();
}

main().catch((err) => {
  console.error("❌ Seed failed:", err);
  process.exit(1);
});
