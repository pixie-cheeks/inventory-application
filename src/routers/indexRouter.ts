import { Router } from 'express';
import {
  getUserNames,
  deleteAllUsers,
} from '../controllers/indexController.ts';
import { CustomNotFoundError } from '../errors.ts';

const indexRouter = Router();

indexRouter.get('/delete', deleteAllUsers);
indexRouter.get(/\/(\?.+)?/, getUserNames);
indexRouter.get('/*all', (_req, _res, next) => {
  console.log(_req.params, _req.query, _req.body);
  next(new CustomNotFoundError('Page not found'));
});

export { indexRouter };
