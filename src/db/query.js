import { pool } from './pool.js';

const getAllUsernames = async () => {
  const { rows } = await pool.query('SELECT * FROM usernames');
  return rows;
};

/** @param {string} searchString */
const getSearchedUsernames = async (searchString) => {
  const { rows } = await pool.query(
    String.raw`select * from usernames where username ilike $1;`,
    [`%${searchString}%`],
  );

  return rows;
};

/** @param {string} username */
const insertUsername = async (username) => {
  await pool.query('INSERT INTO usernames (username) VALUES ($1)', [username]);
};

const deleteAllUsersDB = async () => pool.query('delete from usernames;');

export {
  getAllUsernames,
  insertUsername,
  getSearchedUsernames,
  deleteAllUsersDB,
};
