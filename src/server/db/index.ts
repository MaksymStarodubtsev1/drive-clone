import { createPool, type Pool } from "mysql2/promise";
import { drizzle } from "drizzle-orm/singlestore";

import { env } from "@/env";
import * as schema from "./schema";

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | undefined;
  db: ReturnType<typeof drizzle> | undefined;
};

export const conn =
  globalForDb.conn ?? createPool({
      host: env.SINGLESTORE_HOST,
      port: parseInt(env.SINGLESTORE_PORT),
      user: env.SINGLESTORE_USER,
      password: env.SINGLESTORE_PASS,
      database: env.SINGLESTORE_DB_NAME,
      ssl: {},
      maxIdle: 0,
  });

export const db = globalForDb.db ?? drizzle(conn, { schema });

if (env.NODE_ENV !== "production") {
  globalForDb.conn = conn;
  globalForDb.db = db;
}

conn.addListener("error", (err) => {
    console.error("Database connection error:", err);
})
