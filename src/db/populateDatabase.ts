#!/usr/bin/env node
import fs from 'node:fs/promises';
import path from 'node:path';
import { pool } from './pool.js';
import { dropTables, resetTables, seedTables } from './tableSeeder.js';

const { dirname } = import.meta;
const parameter = process.argv.at(2);
const shouldReset = parameter === '-r' || parameter === '--reset';
const shouldDrop = parameter === '-d' || parameter === '--drop';

const schemaSqlPath = path.resolve(dirname, './schema.sql');
const schemaSQL = await fs.readFile(schemaSqlPath, { encoding: 'utf8' });

if (shouldDrop) {
  console.log('Dropping tables first...');
  await dropTables();
  console.log('Successfully dropped all tables!');
}

console.log('Creating tables...');
await pool.query(schemaSQL);
console.log(
  'Creating tables was successful! Skipped if the tables were already created.',
);

if (shouldReset) {
  console.log('Resetting tables...');
  await resetTables();
  console.log('Resetting tables was successful!');
}

console.log('Seeding those tables...');
await seedTables();

await pool.end();
console.log('Done! Successfully populated the databse.');
