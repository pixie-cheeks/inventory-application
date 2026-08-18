import { Router } from 'express';
import { getAllPokemon, getPokemon } from '../controllers/pokemonController.js';

const pokemonRouter = Router();

pokemonRouter.get('/:id', getPokemon);
pokemonRouter.get('/', getAllPokemon);

export { pokemonRouter };
