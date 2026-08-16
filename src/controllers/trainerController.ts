import expressAsyncHandler from 'express-async-handler';
import { CustomNotFoundError } from '../errors.js';
import {
  getTrainer,
  getAllTrainersDB,
  // getAllPokemonDB
} from '../db/query.js';

const getAllTrainers = expressAsyncHandler(async (_req, res) => {
  const allTrainers = await getAllTrainersDB();
  res.render('main', {
    allTrainers,
    componentName: 'trainers',
  });
});

const getTrainerPage = expressAsyncHandler(async (req, res, next) => {
  const givenTrainerId = Number(req.params.trainerId);

  if (Number.isNaN(givenTrainerId)) {
    next(new CustomNotFoundError('Invalid ID for trainer.'));
    return;
  }
  const trainerData = await getTrainer(givenTrainerId);

  if (!trainerData) {
    next(new CustomNotFoundError('Trainer with this ID does not exist.'));
    return;
  }

  res.render('main', {
    componentName: 'trainerPage',
    trainerData,
  });
});

export { getAllTrainers, getTrainerPage };
