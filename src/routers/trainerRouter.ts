import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  trainerCreate,
  trainerUpdate,
  getAllTrainers,
  getNewTrainerPage,
  getTrainerPage,
  getEditTrainerPage,
} from '../controllers/trainerController.js';

const createTrainerRouter = (): TypeRouter => {
  const trainerRouter = Router();

  trainerRouter.post('/new', ...trainerCreate);
  trainerRouter.get('/new', getNewTrainerPage);
  trainerRouter.post('/:trainerId/edit', ...trainerUpdate);
  trainerRouter.get('/:trainerId/edit', getEditTrainerPage);
  trainerRouter.get('/:trainerId', getTrainerPage);
  trainerRouter.get('/', getAllTrainers);

  return trainerRouter;
};

export { createTrainerRouter };
