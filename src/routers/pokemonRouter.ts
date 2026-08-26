import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  getAllPokemon,
  getNewPokemonPage,
  pokemonCreation,
  getPokemon,
  getEditPokemonPage,
} from '../controllers/pokemonController.js';

const createPokemonRouter = (): TypeRouter => {
  const pokemonRouter = Router();

  pokemonRouter.post('/new', ...pokemonCreation);
  pokemonRouter.get('/new', getNewPokemonPage);
  pokemonRouter.get('/:id/edit', getEditPokemonPage);
  pokemonRouter.get('/:id', getPokemon);
  pokemonRouter.get('/', getAllPokemon);

  return pokemonRouter;
};

export { createPokemonRouter };
