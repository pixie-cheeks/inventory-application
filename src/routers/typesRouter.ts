import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  getNewTypePage,
  getParticularTypePage,
  getTypesPage,
  typeCreation,
} from '../controllers/typesController.js';

const createTypesRouter = (): TypeRouter => {
  const typesRouter = Router();

  typesRouter.post('/new', ...typeCreation);
  typesRouter.get('/new', getNewTypePage);
  typesRouter.get('/:typeName', getParticularTypePage);
  typesRouter.get('/', getTypesPage);

  return typesRouter;
};

export { createTypesRouter };
