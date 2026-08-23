import { BaseTableModel } from './baseTableModel.js';
import { pool } from '../db/pool.js';

interface PokemonType {
  id: number;
  type_name: string;
}

class TypesTableModel extends BaseTableModel<PokemonType> {
  constructor() {
    super(pool, 'types');
  }

  async getRowByTypeName(typeName: string): Promise<PokemonType | undefined> {
    const { rows } = await this.pool.query<PokemonType>(
      `SELECT * FROM ${this.tableName} WHERE type_name = $1;`,
      [typeName],
    );
    return rows.at(0);
  }
}

const typesTable = new TypesTableModel();

export { typesTable };
