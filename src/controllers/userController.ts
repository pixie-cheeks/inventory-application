import type { Request, Response } from 'express';
import { insertUsername } from '../db/query.js';

const userGet = (_req, res: Response) => {
  res.render('createUser');
};

const userPost = async (
  req: Request<unknown, unknown, { username: string }>,
  res: Response,
) => {
  const { username } = req.body;
  await insertUsername(username);
  res.redirect('/');
};

export { userGet, userPost };
