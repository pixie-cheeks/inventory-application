import type { RequestHandler } from 'express';
import { body, matchedData, validationResult } from 'express-validator';
import { CustomNotFoundError } from '../errors.js';
import { trainersTable } from '../models/trainersModel.js';
import { ownedPokemonTable } from '../models/ownedPokemonTabelModel.js';
import type { InsertionTrainer } from '../models/trainersModel.js';
import { pokemonsTable } from '../models/pokemonsModel.js';

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

const getNewTrainerPage: RequestHandler = async (_request, response) => {
  response.render('main', {
    componentName: 'trainer/new',
    allPokemon: await pokemonsTable.getAllRows(),
  });
};

const emptyError = 'cannot be empty.';

const trainerCreationSchema = [
  body('trainer_name')
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyError}.`)
    .custom(async (trainer_name: string) => {
      const trainer = await trainersTable.getTrainerByName(trainer_name);
      if (trainer) throw new Error('A trainer already exists with this name.');
    }),
  body('trainer_description')
    .trim()
    .notEmpty()
    .withMessage(`Description ${emptyError}`),
  body('image_src')
    .trim()
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Trainer Image URL must be valid.'),
  body('owned_pokemon').optional({ values: 'falsy' }).toArray().toInt(),
];

const addTrainer: RequestHandler = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(400).render('main', {
      componentName: 'trainer/new',
      allPokemon: await pokemonsTable.getAllRows(),
      errors: errors.array(),
    });
    return;
  }

  const { owned_pokemon, ...trainerData } = matchedData<
    InsertionTrainer & { owned_pokemon?: number[] }
  >(request);
  const insertedTrainer = await trainersTable.insertRow(trainerData);
  if (!insertedTrainer) throw new Error('Failed to create trainer.');
  if (owned_pokemon)
    await ownedPokemonTable.insertPokemonsInTrainerById(
      insertedTrainer.id,
      owned_pokemon,
    );
  response.redirect('/trainers');
};

const trainerCreate = [trainerCreationSchema, addTrainer];

export { getAllTrainers, getTrainerPage, getNewTrainerPage, trainerCreate };
