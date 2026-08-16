import expressAsyncHandler from 'express-async-handler';
import { CustomNotFoundError } from '../errors.js';
import {
  getTrainer,
  getAllTrainersDB,
  // getAllPokemonDB
} from '../db/query.js';

const getAllTrainers = expressAsyncHandler(async (_request, response) => {
  const allTrainers = await getAllTrainersDB();
  response.render('main', {
    allTrainers,
    componentName: 'trainers',
  });
});

const getTrainerPage = expressAsyncHandler(async (request, response, next) => {
  const givenTrainerId = Number(request.params.trainerId);

  if (Number.isNaN(givenTrainerId)) {
    next(new CustomNotFoundError('Invalid ID for trainer.'));
    return;
  }
  const trainerData = await getTrainer(givenTrainerId);

  if (!trainerData) {
    next(new CustomNotFoundError('Trainer with this ID does not exist.'));
    return;
  }

  response.render('main', {
    componentName: 'trainerPage',
    trainerData,
  });
});

export { getAllTrainers, getTrainerPage };
