import expressAsyncHandler from 'express-async-handler';
import {
  getAllUsernames,
  getSearchedUsernames,
  deleteAllUsersDB,
} from '../db/query.js';

const getUserNames = expressAsyncHandler(async (req, res) => {
  const querySearch = req.query.search;
  if (!querySearch) throw new TypeError('Invalid search query');
  if (Array.isArray(querySearch))
    throw new Error('The given parameter is an array');

  const search = querySearch as string;
  const usernames = search
    ? await getSearchedUsernames(search)
    : await getAllUsernames();
  res.render('index', {
    usernames: usernames.map(({ username }) => username),
  });
});

const deleteAllUsers = expressAsyncHandler(async (_req, res) => {
  await deleteAllUsersDB();
  res.redirect('/');
});

export { getUserNames, deleteAllUsers };
