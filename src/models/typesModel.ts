import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface PokemonType {
  id: number;
  type_name: string;
}

const typesTable = new BaseTableModel<PokemonType>(pool, 'types');

export { typesTable };
