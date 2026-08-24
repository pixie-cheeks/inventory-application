import type { Request, Response } from 'express';

const getIndexPage = (_request: Request, response: Response): void => {
  response.render('main', {
    title: 'Pokemon Inventory App',
  });
};

export { getIndexPage };
