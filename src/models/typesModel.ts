import type { Client } from 'pg';

interface PokemonType {
  id: number;
  type_name: string;
  image_src?: string;
}

class DatabaseSeeder {
  pool: Client;

  constructor(pool: Client) {
    this.pool = pool;
  }

  async getAllTypesDB(): Promise<PokemonType[]> {
    const { rows } = await this.pool.query<PokemonType>('SELECT * FROM types;');
    return rows;
  }

  async getType(id: number): Promise<PokemonType | undefined> {
    const { rows } = await this.pool.query<PokemonType>(
      'SELECT * FROM types WHERE id = $1;',
      [id],
    );
    return rows.at(0);
  }

  async addType({ type_name }: Omit<PokemonType, 'id'>): Promise<void> {
    await this.pool.query('INSERT INTO types (type_name) VALUES ($1);', [
      type_name,
    ]);
  }

  async editType({
    id,
    new_name,
  }: {
    id: number;
    new_name: string;
  }): Promise<void> {
    await this.pool.query('UPDATE types SET type_name = $1 WHERE id = $2;', [
      new_name,
      id,
    ]);
  }

  async deleteType(id: string): Promise<void> {
    await this.pool.query('DELETE FROM types WHERE id = $1;', [id]);
  }

  async deleteAllTypes(): Promise<void> {
    await this.pool.query('DELETE FROM types;');
  }
}

export { DatabaseSeeder };
