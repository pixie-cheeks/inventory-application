import expressAsyncHandler from 'express-async-handler';
import { getAllPokemonDB } from '../db/query.js';

const getAllPokemon = expressAsyncHandler(async (_req, res) => {
  const allPokemon = await getAllPokemonDB();
  res.render('pokemon', {
    allPokemon,
  });
});

export { getAllPokemon };
