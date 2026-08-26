import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface PokemonType {
  id: number;
  type_name: string;
  image_src?: string;
}

class TypesTableModel extends BaseTableModel<PokemonType> {
  constructor() {
    super(pool, 'types');
  }

  async getRowByTypeName(typeName: string): Promise<PokemonType | undefined> {
    const { rows } = await this.pool.query<PokemonType>(
      /* sql */ `
        SELECT
          *
        FROM
          ${this.tableName}
        WHERE
          type_name = $1;
      `,
      [typeName],
    );
    return rows.at(0);
  }

  async deleteRowByTypeName(typeName: string): Promise<void> {
    await this.pool.query(
      /* sql */ `
        DELETE FROM ${this.tableName}
        WHERE
          type_name = $1
      `,
      [typeName],
    );
  }
}

const typesTable = new TypesTableModel();

export { typesTable };
export type { PokemonType };
