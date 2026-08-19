import type { Client } from 'pg';

interface PokemonType {
  id: number;
  type_name: string;
  image_src?: string;
}

class DatabaseSeeder {
  pool: Client;
  getAllTypesDB = async (): Promise<PokemonType[]> => {
    const { rows } = await this.pool.query<PokemonType>('SELECT * FROM types;');
    return rows;
  };
  getType = async (id: number): Promise<PokemonType | undefined> => {
    const { rows } = await this.pool.query<PokemonType>(
      'SELECT * FROM types WHERE id = $1;',
      [id],
    );
    return rows.at(0);
  };
  addType = async ({ type_name }: Omit<PokemonType, 'id'>): Promise<void> => {
    await this.pool.query('INSERT INTO types (type_name) VALUES ($1);', [
      type_name,
    ]);
  };
  editType = async ({
    id,
    new_name,
  }: {
    id: number;
    new_name: string;
  }): Promise<void> => {
    await this.pool.query('UPDATE types SET type_name = $1 WHERE id = $2;', [
      new_name,
      id,
    ]);
  };
  deleteType = async (id: string): Promise<void> => {
    await this.pool.query('DELETE FROM types WHERE id = $1;', [id]);
  };
  deleteAllTypes = async (): Promise<void> => {
    await this.pool.query('DELETE FROM types;');
  };

  constructor(pool: Client) {
    this.pool = pool;
  }
  // async createType(
  //   typeData: Omit<PokemonType, 'id'>,
  // ): Promise<PokemonType | undefined> {
  //   const result = await this.client.query<PokemonType>(
  //     'INSERT INTO types (type_name, image_src) VALUES ($1, $2);',
  //     [typeData.type_name, typeData.image_src],
  //   );

  //   return result.rows.at(0);
  // }
}

export { DatabaseSeeder };
