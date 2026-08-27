import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  trainerCreate,
  trainerUpdate,
  getAllTrainers,
  getNewTrainerPage,
  getTrainerPage,
  getEditTrainerPage,
  deleteTrainer,
} from '../controllers/trainerController.js';
import { adminValidation } from '../utils/adminValidation.js';

const createTrainerRouter = (): TypeRouter => {
  const trainerRouter = Router();

  trainerRouter.post('/new', ...trainerCreate);
  trainerRouter.get('/new', getNewTrainerPage);
  trainerRouter.delete('/:trainerId', adminValidation, deleteTrainer);
  trainerRouter.post('/:trainerId/edit', adminValidation, ...trainerUpdate);
  trainerRouter.get('/:trainerId/edit', getEditTrainerPage);
  trainerRouter.get('/:trainerId', getTrainerPage);
  trainerRouter.get('/', getAllTrainers);

  return trainerRouter;
};

export { createTrainerRouter };
