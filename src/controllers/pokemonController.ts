import { validationResult, matchedData } from 'express-validator';
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

const addPokemon: RequestHandler = async (request, response) => {
  const errors = validationResult(request);
  if (!errors.isEmpty()) {
    response.status(400).render('main', {
      title: 'Add Pokemon',
      componentName: 'pokemon/new',
      errors: errors.array(),
      givenData: request.body as Record<string, string>,
    });
    return;
  }

  const pokemonData = matchedData<InsertionPokemon>(request);
  await pokemonsTable.insertRow(pokemonData);

  response.redirect('/pokemon');
};

const pokemonCreation = [addPokemon];

export { getAllPokemon, getPokemon, pokemonCreation, getNewPokemonPage };
