import { pool } from './pool.ts';

interface Username {
  username: string;
}

const getAllUsernames = async () => {
  const { rows } = await pool.query<Username>('SELECT * FROM usernames');
  return rows;
};

const getSearchedUsernames = async (searchString: string) => {
  const { rows } = await pool.query<Username>(
    String.raw`select * from usernames where username ilike $1;`,
    [`%${searchString}%`],
  );

  return rows;
};

const insertUsername = async (username: string) => {
  await pool.query('INSERT INTO usernames (username) VALUES ($1)', [username]);
};

const deleteAllUsersDB = async () => pool.query('delete from usernames;');

export {
  getAllUsernames,
  insertUsername,
  getSearchedUsernames,
  deleteAllUsersDB,
};
