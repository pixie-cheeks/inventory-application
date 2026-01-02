#!/usr/bin/env node
import { configDotenv } from 'dotenv';
import fs from 'node:fs';
import { Client } from 'pg';
import path from 'node:path';
import { tableSeeds } from './tableSeeds.js';

const { dirname } = import.meta;
const parameter = process.argv.at(2);
const isProduction = parameter === '-p' || parameter === '--production';
const schemaSqlPath = path.resolve(dirname, './schema.sql');
const configPath = path.resolve(
  dirname,
  `../../.env${isProduction ? '.production' : ''}`,
);

const schemaSQL = fs.readFileSync(schemaSqlPath).toString();
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

const client = new Client(getConfig());
await client.connect();
await client.query(schemaSQL);
const insertValuesFormat = (listOfStrings: string[]) =>
  listOfStrings
    .map((theString, index) => {
      if (index % 2 === 0) {
        if (index === listOfStrings.length - 1) return `${theString})`;
        return `${theString}), `;
      }

      return `(${theString}`;
    })
    .join('');

console.log('seeding...');
await Promise.all(
  Object.entries(tableSeeds).map(([tableName, tableData]) => {
    if (!tableData) return Promise.resolve();
    return client.query(
      `INSERT INTO ${tableName} (${tableData.columns.join(', ')})
       VALUES ${insertValuesFormat(tableData.values.map((valueGroup) => valueGroup.join(', ')))};`,
    );
  }),
);
await client.end();
console.log('done');
