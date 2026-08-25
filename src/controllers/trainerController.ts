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
    title: 'Trainers',
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

  const ownedPokemons =
    await ownedPokemonTable.getPokemonsByTrainerId(givenTrainerId);

  response.render('main', {
    title: trainerData.trainer_name,
    componentName: 'trainer/one',
    trainerData,
    ownedPokemons,
  });
};

const getNewTrainerPage: RequestHandler = async (_request, response) => {
  response.render('main', {
    title: 'Add trainer',
    componentName: 'trainer/new',
    allPokemon: await pokemonsTable.getAllRows(),
  });
};

const getEditTrainerPage: RequestHandler = async (request, response) => {
  const givenTrainerId = Number(request.params.trainerId);

  if (Number.isNaN(givenTrainerId))
    throw new CustomNotFoundError('Invalid ID for trainer.');

  const trainerData = await trainersTable.getRowById(givenTrainerId);
  if (!trainerData)
    throw new CustomNotFoundError('Trainer with this ID does not exist.');

  const [allPokemonInDB, ownedPokemons] = await Promise.all([
    pokemonsTable.getAllRows(),
    ownedPokemonTable.getPokemonsByTrainerId(givenTrainerId),
  ]);

  response.render('main', {
    title: 'Edit trainer',
    componentName: 'trainer/edit',
    trainerData,
    allPokemon: allPokemonInDB.map((pokemon) =>
      ownedPokemons.some((ownedOne) => ownedOne.id === pokemon.id)
        ? { ...pokemon, selected: true }
        : { ...pokemon, selected: false },
    ),
  });
};

const emptyError = 'cannot be empty.';

const trainerCreationSchema = [
  body('trainer_name')
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyError}.`)
    .custom(
      async (
        trainer_name: string,
        { req }: { req: { body?: Record<string, string> } },
      ) => {
        const trainer = await trainersTable.getTrainerByName(trainer_name);
        if (trainer?.id === Number(req.body?.id)) return;
        if (trainer)
          throw new Error('A trainer already exists with this name.');
      },
    ),
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
      title: 'Add trainer',
      componentName: 'trainer/new',
      allPokemon: await pokemonsTable.getAllRows(),
      errors: errors.array(),
      givenData: request.body as Record<string, string>,
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

const editTrainer: RequestHandler = async (request, response) => {
  const requestBody = request.body as Record<string, string>;
  const trainerId = Number(requestBody.id);
  const trainerDataInDB = await trainersTable.getRowById(trainerId);
  if (!trainerDataInDB)
    throw new CustomNotFoundError('The trainer being updated does not exist.');

  const errors = validationResult(request);

  const { owned_pokemon, ...trainerData } = matchedData<
    InsertionTrainer & { owned_pokemon?: number[] }
  >(request);

  if (!errors.isEmpty()) {
    response.status(400).render('main', {
      title: 'Edit trainer',
      trainerData: { id: trainerId },
      componentName: 'trainer/edit',
      allPokemon: await pokemonsTable.getAllRows(),
      errors: errors.array(),
      givenData: requestBody,
    });
    return;
  }

  await trainersTable.editRowById(trainerId, trainerData);
  const previouslyOwnedPokemon =
    await ownedPokemonTable.getRowsByTrainerId(trainerId);

  if (owned_pokemon && previouslyOwnedPokemon.length > 0) {
    const mappedPreviousPokemon = previouslyOwnedPokemon.map(
      ({ pokemon_id }) => pokemon_id,
    );
    const pokemonToDelete = mappedPreviousPokemon.filter(
      (pokemon_id) => !owned_pokemon.includes(pokemon_id),
    );
    const pokemonToAdd = owned_pokemon.filter(
      (pokemonId) => !mappedPreviousPokemon.includes(pokemonId),
    );

    await ownedPokemonTable.deleteTrainerRowsByPokemonIds(
      trainerId,
      pokemonToDelete,
    );
    await ownedPokemonTable.insertPokemonsInTrainerById(
      trainerId,
      pokemonToAdd,
    );
  } else if (owned_pokemon) {
    // New Pokemon! Add them.
    await ownedPokemonTable.insertPokemonsInTrainerById(
      trainerId,
      owned_pokemon,
    );
  }

  response.redirect(`/trainers/${trainerId}`);
};

const trainerCreate = [trainerCreationSchema, addTrainer];
const trainerUpdate = [trainerCreationSchema, editTrainer];

export {
  getAllTrainers,
  getTrainerPage,
  getNewTrainerPage,
  trainerCreate,
  getEditTrainerPage,
  trainerUpdate,
};
