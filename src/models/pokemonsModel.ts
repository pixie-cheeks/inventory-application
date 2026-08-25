import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface InsertionPokemon {
  pokemon_name: string;
  pokemon_description: string;
  type_one: string;
  type_two?: string;
  image_src?: string;
}

type Pokemon = {
  id: number;
} & InsertionPokemon;

class PokemonTableModel extends BaseTableModel<Pokemon> {
  constructor() {
    super(pool, 'pokemons');
  }

  async getRowsByTypeName(typeName: string): Promise<Pokemon[]> {
    const { rows } = await this.pool.query<Pokemon>(
      /* sql */ `
        SELECT
          *
        FROM
          ${this.tableName}
        WHERE
          type_one = $1
          OR type_two = $1;
      `,
      [typeName],
    );
    return rows;
  }
}

const pokemonsTable = new PokemonTableModel();

export { pokemonsTable };
export type { Pokemon, InsertionPokemon };
