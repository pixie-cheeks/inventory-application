import { Router } from 'express';
import {
  getParticularTypePage,
  getTypesPage,
} from '../controllers/typesController.js';

const typesRouter = Router();

typesRouter.get('/:typeName', getParticularTypePage);
typesRouter.get('/', getTypesPage);

export { typesRouter };
