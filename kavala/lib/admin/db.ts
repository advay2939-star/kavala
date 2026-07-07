import { Pool, type QueryResult, type QueryResultRow } from "pg";

/**
 * Thin typed Postgres access for the admin layer and webhooks.
 * One pool per server process; schema lives in db/schema.sql.
 */
let pool: Pool | null = null;

function getPool(): Pool {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set. See .env.example.");
  if (!pool) pool = new Pool({ connectionString: url, max: 10 });
  return pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = [],
): Promise<QueryResult<T>> {
  return getPool().query<T>(text, params);
}
