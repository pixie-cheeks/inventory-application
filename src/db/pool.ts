import 'dotenv/config';
import type { PoolConfig } from 'pg';
import { Pool } from 'pg';
import { getConnectionString } from './aivenControl.js';

const getConfig = async (): Promise<PoolConfig> =>
  process.env.DB_ENV === 'prod'
    ? {
        connectionString: await getConnectionString(),
        ssl: {
          rejectUnauthorized: true,
          ca: process.env.DB_SSL_CA,
        },
      }
    : { connectionString: process.env.CONNECTION_STRING };

const pool = new Pool(await getConfig());

export { pool };
