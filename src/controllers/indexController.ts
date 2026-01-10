import type { Request, Response } from 'express';

const getIndexPage = (_req: Request, res: Response): void => {
  res.render('main');
};

export { getIndexPage };
