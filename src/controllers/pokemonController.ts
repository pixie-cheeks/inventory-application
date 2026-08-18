import type { RequestHandler } from 'express';
import { getAllPokemonDB, getPokemonDB } from '../db/query.js';
import { CustomNotFoundError } from '../errors.js';

const getPokemon: RequestHandler = async (request, response) => {
  const pokemonId = Number(request.params.id);
  if (Number.isNaN(pokemonId)) {
    throw new CustomNotFoundError('Invalid Pokemon ID.');
  }

  const pokemon = await getPokemonDB(pokemonId);
  if (!pokemon) {
    throw new CustomNotFoundError("Pokemon with this ID doesn't exist.");
  }

  response.render('main', {
    pokemon,
    componentName: 'particularPokemon',
  });
};

const getAllPokemon: RequestHandler = async (_request, response) => {
  const allPokemon = await getAllPokemonDB();
  response.render('main', {
    allPokemon,
    componentName: 'pokemon',
  });
};

export { getAllPokemon, getPokemon };
