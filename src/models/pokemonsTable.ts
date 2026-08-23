import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface Pokemon {
  id: number;
  pokemon_name: string;
  pokemon_description: string;
  type_one: string;
  type_two?: string;
}

const pokemonsTable = new BaseTableModel<Pokemon>(pool, 'pokemons');

export { pokemonsTable };
