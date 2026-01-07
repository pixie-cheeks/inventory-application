import { Router } from 'express';
import { getTypesPage } from '../controllers/typesController.js';

const typesRouter = Router();

typesRouter.get('/', getTypesPage);

export { typesRouter };
