import { Router } from 'express';
import { getAllTypes } from '../controllers/typesController.js';

const typesRouter = Router();

typesRouter.get('/', getAllTypes);

export { typesRouter };
