import expressAsyncHandler from 'express-async-handler';
import {
  getAllUsernames,
  getSearchedUsernames,
  deleteAllUsersDB,
} from '../db/query.js';

const getUserNames = expressAsyncHandler(async (req, res) => {
  const { search } = req.query;
  const usernames = search
    ? // @ts-ignore
      await getSearchedUsernames(search)
    : await getAllUsernames();
  res.render('index', { usernames: usernames.map(({ username }) => username) });
});

const deleteAllUsers = expressAsyncHandler(async (_req, res) => {
  await deleteAllUsersDB();
  res.redirect('/');
});

export { getUserNames, deleteAllUsers };
