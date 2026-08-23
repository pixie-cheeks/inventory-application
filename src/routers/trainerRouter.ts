import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  addNewTrainer,
  getAllTrainers,
  getNewTrainerPage,
  getTrainerPage,
} from '../controllers/trainerController.js';

const createTrainerRouter = (): TypeRouter => {
  const trainerRouter = Router();

  trainerRouter.post('/new', addNewTrainer);
  trainerRouter.get('/new', getNewTrainerPage);
  trainerRouter.get('/:trainerId', getTrainerPage);
  trainerRouter.get('/', getAllTrainers);

  return trainerRouter;
};

export { createTrainerRouter };
