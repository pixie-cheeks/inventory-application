import { Router } from 'express';
import { getIndexPage } from '../controllers/indexController.js';
import { CustomNotFoundError } from '../errors.js';

const indexRouter = Router();

indexRouter.get('/', getIndexPage);
indexRouter.get('/*all', (_request, _response, next) => {
  next(new CustomNotFoundError('Page not found'));
});

export { indexRouter };
