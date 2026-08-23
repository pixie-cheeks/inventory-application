import type { RequestHandler } from 'express';
import { pokemonsTable } from '../models/pokemonsModel.js';
import { CustomNotFoundError } from '../errors.js';

const getPokemon: RequestHandler = async (request, response) => {
  const pokemonId = Number(request.params.id);
  if (Number.isNaN(pokemonId)) {
    throw new CustomNotFoundError('Invalid Pokemon ID.');
  }

  const pokemon = await pokemonsTable.getRowById(pokemonId);
  if (!pokemon) {
    throw new CustomNotFoundError("Pokemon with this ID doesn't exist.");
  }

  response.render('main', {
    pokemon,
    componentName: 'pokemon/one',
  });
};

const getAllPokemon: RequestHandler = async (_request, response) => {
  const allPokemon = await pokemonsTable.getAllRows();
  response.render('main', {
    allPokemon,
    componentName: 'pokemon/all',
  });
};

export { getAllPokemon, getPokemon };
