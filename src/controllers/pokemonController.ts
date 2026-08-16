import expressAsyncHandler from 'express-async-handler';
import { getAllPokemonDB } from '../db/query.js';

const getAllPokemon = expressAsyncHandler(async (_request, response) => {
  const allPokemon = await getAllPokemonDB();
  response.render('main', {
    allPokemon,
    componentName: 'pokemon',
  });
});

export { getAllPokemon };
