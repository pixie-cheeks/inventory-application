import { Router } from 'express';
import {
  getUserNames,
  deleteAllUsers,
} from '../controllers/indexController.js';
import { CustomNotFoundError } from '../errors.js';

const indexRouter = Router();

indexRouter.get('/delete', deleteAllUsers);
indexRouter.get(/\/(\?.+)?/, getUserNames);
indexRouter.get('/*all', (_req, _res, next) => {
  console.log(_req.params, _req.query, _req.body);
  next(new CustomNotFoundError('Page not found'));
});

export { indexRouter };
