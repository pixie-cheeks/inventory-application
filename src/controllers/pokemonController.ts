import type { RequestHandler } from 'express';
import { getAllPokemonDB } from '../db/query.js';

const getAllPokemon: RequestHandler = async (_request, response) => {
  const allPokemon = await getAllPokemonDB();
  response.render('main', {
    allPokemon,
    componentName: 'pokemon',
  });
};

export { getAllPokemon };
