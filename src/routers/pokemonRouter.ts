import type { Router as TypeRouter } from 'express';
import { Router } from 'express';
import { getAllPokemon, getPokemon } from '../controllers/pokemonController.js';

const createPokemonRouter = (): TypeRouter => {
  const pokemonRouter = Router();

  pokemonRouter.get('/:id', getPokemon);
  pokemonRouter.get('/', getAllPokemon);

  return pokemonRouter;
};

export { createPokemonRouter };
