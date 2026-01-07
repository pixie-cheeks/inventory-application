import type { Request, Response } from 'express';

const getIndexPage = (_req: Request, res: Response) => {
  res.render('main');
};

export { getIndexPage };
