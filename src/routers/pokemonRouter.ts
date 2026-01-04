import { Router } from 'express';
import { getAllPokemon } from '../controllers/pokemonController.js';

const pokemonRouter = Router();

pokemonRouter.get('/', getAllPokemon);

export { pokemonRouter };
