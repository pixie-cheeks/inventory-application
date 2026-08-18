import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  getParticularTypePage,
  getTypesPage,
} from '../controllers/typesController.js';

const createTypesRouter = (): TypeRouter => {
  const typesRouter = Router();

  typesRouter.get('/:typeName', getParticularTypePage);
  typesRouter.get('/', getTypesPage);

  return typesRouter;
};

export { createTypesRouter };
