import type { RequestHandler } from 'express';
import { CustomNotFoundError } from '../errors.js';
import { trainersTable } from '../models/trainersModel.js';

const getAllTrainers: RequestHandler = async (_request, response) => {
  const allTrainers = await trainersTable.getAllRows();
  response.render('main', {
    allTrainers,
    componentName: 'trainer/all',
  });
};

const getTrainerPage: RequestHandler = async (request, response, next) => {
  const givenTrainerId = Number(request.params.trainerId);

  if (Number.isNaN(givenTrainerId)) {
    next(new CustomNotFoundError('Invalid ID for trainer.'));
    return;
  }
  const trainerData = await trainersTable.getRowById(givenTrainerId);

  if (!trainerData) {
    next(new CustomNotFoundError('Trainer with this ID does not exist.'));
    return;
  }

  response.render('main', {
    componentName: 'trainer/one',
    trainerData,
  });
};

export { getAllTrainers, getTrainerPage };
