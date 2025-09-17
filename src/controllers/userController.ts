import { insertUsername } from '../db/query.ts';
/**
 * @param {import('express').Request} _req
 * @param {import('express').Response} res */
const userGet = (_req, res) => {
  res.render('createUser');
};

/**
 * @param {import('express').Request} req
 * @param {import('express').Response} res */
const userPost = async (req, res) => {
  const { username } = req.body;
  await insertUsername(username);
  res.redirect('/');
};

export { userGet, userPost };
