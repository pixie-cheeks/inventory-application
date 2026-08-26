import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import {
  getAllPokemon,
  getNewPokemonPage,
  pokemonCreation,
  getPokemon,
  getEditPokemonPage,
  pokemonUpdate,
  deletePokemon,
} from '../controllers/pokemonController.js';
import { adminValidation } from '../utils/adminValidation.js';

const createPokemonRouter = (): TypeRouter => {
  const pokemonRouter = Router();

  pokemonRouter.post('/new', ...pokemonCreation);
  pokemonRouter.get('/new', getNewPokemonPage);
  pokemonRouter.delete('/:id', adminValidation, deletePokemon);
  pokemonRouter.post('/:id/edit', ...pokemonUpdate);
  pokemonRouter.get('/:id/edit', getEditPokemonPage);
  pokemonRouter.get('/:id', getPokemon);
  pokemonRouter.get('/', getAllPokemon);

  return pokemonRouter;
};

export { createPokemonRouter };
