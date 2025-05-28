#!/usr/bin/env node
import { Client } from 'pg';
import 'dotenv/config';

const SQL = `
CREATE TABLE IF NOT EXISTS usernames (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  username VARCHAR ( 255 )
);

INSERT INTO usernames (username) 
VALUES
  ('Bryan'),
  ('Odin'),
  ('Damon');
`;

console.log('seeding...');
const client = new Client();
await client.connect();
await client.query(SQL);
await client.end();
console.log('done');
