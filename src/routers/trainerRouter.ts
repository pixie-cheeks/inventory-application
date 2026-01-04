import { Router } from 'express';
import { getAllTrainers } from '../controllers/trainerController.js';

const trainersRouter = Router();

trainersRouter.get('/', getAllTrainers);

export { trainersRouter };
