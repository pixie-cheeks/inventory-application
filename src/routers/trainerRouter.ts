import { Router } from 'express';
import {
  getAllTrainers,
  getTrainerPage,
} from '../controllers/trainerController.js';

const trainersRouter = Router();

trainersRouter.get('/:trainerId', getTrainerPage);
trainersRouter.get('/', getAllTrainers);

export { trainersRouter };
