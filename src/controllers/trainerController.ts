import type { RequestHandler } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { CustomNotFoundError } from '../errors.js';
import { trainersTable } from '../models/trainersModel.js';
import { ownedPokemonTable } from '../models/ownedPokemonTabelModel.js';
import type { InsertionTrainer } from '../models/trainersModel.js';

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
  const ownedPokemons =
    await ownedPokemonTable.getPokemonsByTrainerId(givenTrainerId);

  if (!trainerData) {
    next(new CustomNotFoundError('Trainer with this ID does not exist.'));
    return;
  }

  response.render('main', {
    componentName: 'trainer/one',
    trainerData,
    ownedPokemons,
  });
};

const getNewTrainerPage: RequestHandler = (_request, response) => {
  response.render('main', {
    componentName: 'trainer/new',
  });
};

const emptyError = 'cannot be empty.';
const textError = 'must only contain letters, numbers, spaces';

const trainerCreationSchema = [
  body('trainer_name')
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyError}.`)
    .matches(/^[a-z 1-9]+$/gi)
    .withMessage(`Name ${textError} and no newlines.`),
  body('trainer_description')
    .trim()
    .notEmpty()
    .withMessage(`Description ${emptyError}`)
    .matches(/^[a-z 1-9\r\n]+$/gi)
    .withMessage(`Description ${textError} and newlines.`),
  body('image_src').optional({ values: 'falsy' }).isURL(),
];

const addTrainer: RequestHandler = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(400).render('main', {
      componentName: 'trainer/new',
      errors: errors.array(),
    });
    return;
  }

  const trainerData = matchedData<InsertionTrainer>(request);
  await trainersTable.insertRow(trainerData);
  response.redirect('/');
};

const trainerCreate = [trainerCreationSchema, addTrainer];

export { getAllTrainers, getTrainerPage, getNewTrainerPage, trainerCreate };
