import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';
import type { Pokemon } from './pokemonsModel.js';
import type { Trainer } from './trainersModel.js';

interface OwnedPokemon {
  id: number;
  pokemon_id: number;
  trainer_id: number;
}

class OwnedPokemonTableModel extends BaseTableModel<OwnedPokemon> {
  constructor() {
    super(pool, 'owned_pokemons');
  }

  async getPokemonsByTrainerId(trainerId: number): Promise<Pokemon[]> {
    const { rows } = await this.pool.query<Pokemon>(
      /* sql */ `
        SELECT
          *
        FROM
          pokemons
        WHERE
          id IN (
            SELECT
              pokemon_id
            FROM
              ${this.tableName}
            WHERE
              trainer_id = $1
          );
      `,
      [trainerId],
    );
    return rows;
  }

  async getTrainersByPokemonId(pokemonId: number): Promise<Trainer[]> {
    const { rows } = await this.pool.query<Trainer>(
      /* sql */ `
        SELECT
          *
        FROM
          trainers
        WHERE
          id IN (
            SELECT
              trainer_id
            FROM
              ${this.tableName}
            WHERE
              pokemon_id = $1
          );
      `,
      [pokemonId],
    );
    return rows;
  }

  async insertPokemonsInTrainerById(
    trainerId: number,
    pokemonIds: number[],
  ): Promise<OwnedPokemon[]> {
    const valuesClause = pokemonIds
      .map((_pokemonId, index) => `$1, $${index + 2}`)
      .join('), ');
    const { rows } = await this.pool.query<OwnedPokemon>(
      /* sql */ `
        INSERT INTO
          ${this.tableName} (trainer_id, pokemon_id)
        VALUES
          (${valuesClause});
      `,
      [trainerId, ...pokemonIds],
    );

    return rows;
  }
}

const ownedPokemonTable = new OwnedPokemonTableModel();

export { ownedPokemonTable };
export type { OwnedPokemon };
