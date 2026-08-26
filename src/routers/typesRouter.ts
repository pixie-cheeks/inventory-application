import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  deleteType,
  getEditTypePage,
  getNewTypePage,
  getParticularTypePage,
  getTypesPage,
  typeCreation,
  typeUpdate,
} from '../controllers/typesController.js';

const createTypesRouter = (): TypeRouter => {
  const typesRouter = Router();

  typesRouter.post('/new', ...typeCreation);
  typesRouter.get('/new', getNewTypePage);
  typesRouter.delete('/:typeName', deleteType);
  typesRouter.post('/:typeName/edit', ...typeUpdate);
  typesRouter.get('/:typeName/edit', getEditTypePage);
  typesRouter.get('/:typeName', getParticularTypePage);
  typesRouter.get('/', getTypesPage);

  return typesRouter;
};

export { createTypesRouter };
