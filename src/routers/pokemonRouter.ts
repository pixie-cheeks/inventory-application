import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  getAllPokemon,
  getNewPokemonPage,
  pokemonCreation,
  getPokemon,
} from '../controllers/pokemonController.js';

const createPokemonRouter = (): TypeRouter => {
  const pokemonRouter = Router();

  pokemonRouter.post('/new', ...pokemonCreation);
  pokemonRouter.get('/new', getNewPokemonPage);
  pokemonRouter.get('/:id', getPokemon);
  pokemonRouter.get('/', getAllPokemon);

  return pokemonRouter;
};

export { createPokemonRouter };
