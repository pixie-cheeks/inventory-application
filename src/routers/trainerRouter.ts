import { Router } from 'express';
import {
  getAllTrainers,
  getTrainerPage,
} from '../controllers/trainerController.js';

const trainersRouter = Router();

trainersRouter.get('/:trainerName', getTrainerPage);
trainersRouter.get('/', getAllTrainers);

export { trainersRouter };
