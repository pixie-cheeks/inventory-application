import { validationResult, matchedData, body } from 'express-validator';
import type { RequestHandler } from 'express';
import {
  pokemonsTable,
  type InsertionPokemon,
} from '../models/pokemonsModel.js';
import { CustomNotFoundError } from '../errors.js';
import { ownedPokemonTable } from '../models/ownedPokemonTableModel.js';
import { typesTable } from '../models/typesModel.js';

const getPokemon: RequestHandler = async (request, response) => {
  const pokemonId = Number(request.params.id);
  if (Number.isNaN(pokemonId)) {
    throw new CustomNotFoundError('Invalid Pokemon ID.');
  }

  const pokemon = await pokemonsTable.getRowById(pokemonId);
  if (!pokemon) {
    throw new CustomNotFoundError("Pokemon with this ID doesn't exist.");
  }

  const trainerOwners =
    await ownedPokemonTable.getTrainersByPokemonId(pokemonId);

  response.render('main', {
    title: pokemon.pokemon_name,
    pokemon,
    componentName: 'pokemon/one',
    trainerOwners,
  });
};

const getAllPokemon: RequestHandler = async (_request, response) => {
  const [allTypes, allPokemon] = await Promise.all([
    typesTable.getAllRows(),
    pokemonsTable.getAllRows(),
  ]);
  response.render('main', {
    title: 'All Pokemon',
    allPokemon,
    haveTypes: allTypes.length > 0,
    componentName: 'pokemon/all',
  });
};

const getNewPokemonPage: RequestHandler = async (_request, response) => {
  const allTypes = await typesTable.getAllRows();
  if (allTypes.length === 0)
    throw new CustomNotFoundError(
      "Oops, can't create a new pokemon. No types have been created yet.",
    );
  response.render('main', {
    title: 'Add Pokemon',
    componentName: 'pokemon/new',
    allTypes,
  });
};

const getEditPokemonPage: RequestHandler = async (request, response) => {
  const pokemonId = Number(request.params.id);
  if (Number.isNaN(pokemonId))
    throw new CustomNotFoundError('Invalid pokemon ID.');

  const pokemonData = await pokemonsTable.getRowById(pokemonId);
  if (!pokemonData)
    throw new CustomNotFoundError('No pokemon with this ID exist.');

  const allTypes = await typesTable.getAllRows();

  response.render('main', {
    title: 'Edit Pokemon',
    componentName: 'pokemon/edit',
    pokemonData,
    allTypes,
  });
};

const emptyError = 'cannot be empty';

const pokemonCreationSchema = [
  body('pokemon_name')
    .trim()
    .notEmpty()
    .withMessage(`Name ${emptyError}.`)
    .custom(
      async (
        pokemon_name: string,
        { req }: { req: { body?: Record<string, string> } },
      ) => {
        const pokemon = await pokemonsTable.getPokemonByName(pokemon_name);
        if (pokemon?.id === Number(req.body?.id)) return;
        if (pokemon)
          throw new Error('A pokemon already exists with this name.');
      },
    ),
  body('pokemon_description')
    .trim()
    .notEmpty()
    .withMessage(`Description ${emptyError}`),
  body('type_one')
    .trim()
    .notEmpty()
    .withMessage('The primary type of a pokemon is required.'),
  body('type_two')
    .optional({ values: 'falsy' })
    .trim()
    .notEmpty()
    .custom(
      (
        type_two: string,
        { req }: { req: { body?: Record<string, string> } },
      ) => {
        if (type_two === req.body?.type_one)
          throw new Error("The primary and secondary types can't be the same.");
        return true;
      },
    ),
  body('image_src')
    .trim()
    .optional({ values: 'falsy' })
    .isURL()
    .withMessage('Pokemon Image URL must be valid.'),
];

const pokemonUpdateSchema = [...pokemonCreationSchema];

const editPokemon: RequestHandler = async (request, response) => {
  const errors = validationResult(request);
  const givenData = request.body as Record<string, string>;
  const pokemonId = Number(request.params.id);

  if (Number.isNaN(pokemonId)) {
    throw new CustomNotFoundError('No pokemon with this ID found.');
  }

  if (!errors.isEmpty()) {
    response.status(400).render('main', {
      title: 'Edit Pokemon',
      componentName: `pokemon/edit`,
      allTypes: await typesTable.getAllRows(),
      errors: errors.array(),
      pokemonData: { id: pokemonId },
      givenData,
    });
    return;
  }

  const pokemonData = matchedData<InsertionPokemon>(request);
  await pokemonsTable.editRowById(pokemonId, pokemonData);

  response.redirect(`/pokemon/${pokemonId}`);
};

const addPokemon: RequestHandler = async (request, response) => {
  const errors = validationResult(request);
  const givenData = request.body as Record<string, string>;

  if (!errors.isEmpty()) {
    response.status(400).render('main', {
      title: 'Add Pokemon',
      componentName: 'pokemon/new',
      allTypes: await typesTable.getAllRows(),
      errors: errors.array(),
      givenData,
    });
    return;
  }

  const pokemonData = matchedData<InsertionPokemon>(request);
  await pokemonsTable.insertRow(pokemonData);

  response.redirect('/pokemon');
};

const deletePokemon: RequestHandler = async (request, response) => {
  const pokemonId = Number(request.params.id);
  if (Number.isNaN(pokemonId))
    throw new CustomNotFoundError('Invalid trainer ID.');

  const errors = validationResult(request);

  if (!errors.isEmpty()) {
    response.status(400).send({ errors: errors.array() });
    return;
  }

  await pokemonsTable.deleteRowById(pokemonId);
  response.status(200).send({ redirectTo: '/pokemon' });
};

const pokemonCreation = [pokemonCreationSchema, addPokemon];
const pokemonUpdate = [pokemonUpdateSchema, editPokemon];

export {
  getAllPokemon,
  getPokemon,
  pokemonCreation,
  getNewPokemonPage,
  getEditPokemonPage,
  pokemonUpdate,
  deletePokemon,
};
