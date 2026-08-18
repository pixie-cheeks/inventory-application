import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  getAllTrainers,
  getTrainerPage,
} from '../controllers/trainerController.js';

const createTrainerRouter = (): TypeRouter => {
  const trainerRouter = Router();

  trainerRouter.get('/:trainerId', getTrainerPage);
  trainerRouter.get('/', getAllTrainers);

  return trainerRouter;
};

export { createTrainerRouter };
