#!/usr/bin/env node
import { configDotenv } from 'dotenv';
import fs from 'node:fs';
import { Client } from 'pg';
import path from 'node:path';

const { dirname } = import.meta;
const parameter = process.argv.at(2);
const isProduction = parameter === '-p' || parameter === '--production';
const seedSqlPath = path.resolve(dirname, './seed.sql');
const configPath = path.resolve(
  dirname,
  `../../.env${isProduction ? '.production' : ''}`,
);

if (!fs.existsSync(configPath))
  throw new Error(`Environment config file (${configPath}) doesn't exist.`);

if (!fs.existsSync(seedSqlPath))
  throw new Error(`Seed file (${seedSqlPath}) doesn't exist.`);

const SQL = fs.readFileSync(seedSqlPath).toString();
const getConfig = () =>
  isProduction
    ? {
        ssl: {
          rejectUnauthorized: true,
          ca: process.env.DB_SSL_CA,
        },
      }
    : {};

configDotenv({
  path: configPath,
});

console.log('seeding...');
const client = new Client(getConfig());
await client.connect();
await client.query(SQL);
await client.end();
console.log('done');
