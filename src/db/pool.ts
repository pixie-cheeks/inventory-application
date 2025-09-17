import 'dotenv/config';
import { Pool } from 'pg';

const getConfig = () =>
  process.env.DB_ENV === 'prod'
    ? {
        ssl: {
          rejectUnauthorized: true,
          ca: process.env.DB_SSL_CA,
        },
      }
    : {};
const pool = new Pool(getConfig());

export { pool };
