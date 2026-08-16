#!/usr/bin/env node
import { configDotenv } from 'dotenv';
import fs from 'node:fs';
import { Client, type PoolConfig } from 'pg';
import path from 'node:path';
import { tableSeeds, type TableSchema } from './tableSeeds.js';

const { dirname } = import.meta;
const parameter = process.argv.at(2);
const isProduction = parameter === '-p' || parameter === '--production';
const schemaSqlPath = path.resolve(dirname, './schema.sql');
const configPath = path.resolve(
  dirname,
  `../../.env${isProduction ? '.production' : ''}`,
);

const schemaSQL = fs.readFileSync(schemaSqlPath).toString();
const getConfig = (): PoolConfig =>
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

const client = new Client(getConfig());
await client.connect();
await client.query(schemaSQL);
const formatInsertValues = (valueGroups: TableSchema['values']): string =>
  valueGroups
    .map((eachGroup) =>
      eachGroup.map((eachValue) => `'${eachValue}'`).join(', '),
    )
    .map((eachGroupString) => `(${eachGroupString})`)
    .join(', ');

console.log('seeding...');
await Promise.all(
  Object.entries(tableSeeds).map(([tableName, tableData]) => {
    if (!tableData) return Promise.resolve();

    const sqlQueryString = `INSERT INTO ${tableName} (${tableData.columns.join(', ')})
       VALUES ${formatInsertValues(tableData.values)} ON CONFLICT DO NOTHING;`;

    return client.query(sqlQueryString);
  }),
);
await client.end();
console.log('done');
