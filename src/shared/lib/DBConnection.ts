import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import { Env } from '@/shared/lib/Env';
import { logger } from '@/shared/lib/Logger';
import * as schema from '@/entities/counter/model/Schema';

// Need a database for production? Check out https://www.prisma.io/?via=nextjsboilerplate
// Tested and compatible with Next.js Boilerplate
export const createDbConnection = () => {
  const isLocalDatabase = Env.DATABASE_URL.includes('localhost') || Env.DATABASE_URL.includes('127.0.0.1');

  const pool = new Pool({
    connectionString: Env.DATABASE_URL,
    max: isLocalDatabase ? 1 : undefined,
  });

  pool.on('error', (error) => {
    logger.error(`Database pool error: ${error.message}`);
  });

  return drizzle({
    client: pool,
    schema,
  });
};
