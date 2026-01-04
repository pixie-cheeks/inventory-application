import { pool } from './pool.js';

interface PokemonType {
  id: number;
  type_name: string;
}

interface Pokemon {
  id: number;
  pokemon_name: string;
  type_one: string;
  type_two?: string;
}

interface Trainer {
  id: number;
  trainer_name: string;
}

const getAllTypesDB = async () => {
  const { rows } = await pool.query<PokemonType>('SELECT * FROM types;');
  return rows;
};

const addType = async ({ type_name }: Omit<PokemonType, 'id'>) => {
  await pool.query('INSERT INTO types (type_name) VALUES ($1);', [type_name]);
};

const deleteType = async (id: string) => {
  await pool.query('DELETE FROM types WHERE id = $1;', [id]);
};

const deleteAllTypes = async () => {
  await pool.query('DELETE FROM types;');
};

const getAllPokemonDB = async () => {
  const { rows } = await pool.query<Pokemon>('SELECT * FROM pokemon;');
  return rows;
};

const addPokemon = async ({
  pokemon_name,
  type_one,
  type_two,
}: Omit<Pokemon, 'id'>) => {
  await pool.query(
    `INSERT INTO pokemon (pokemon_name, type_one, type_two) VALUES ($1, $2, $3);`,
    [pokemon_name, type_one, type_two],
  );
};

const deletePokemon = async (id: number) => {
  await pool.query('DELETE FROM pokemon WHERE id = $1;', [id]);
};

const deleteAllPokemon = async () => {
  await pool.query('DELETE FROM pokemon;');
};

const getAllTrainersDB = async () => {
  const { rows } = await pool.query<Trainer>('SELECT * FROM trainers;');
  return rows;
};

const addTrainer = async ({ trainer_name }: Omit<Trainer, 'id'>) => {
  await pool.query('INSERT INTO trainers (trainer_name) VALUES ($1);', [
    trainer_name,
  ]);
};

const deleteTrainer = async (id: string) => {
  await pool.query('DELETE FROM Trainers WHERE id = $1;', [id]);
};

const deleteAllTrainers = async () => {
  await pool.query('DELETE FROM Trainers;');
};

export {
  getAllTypesDB,
  addType,
  deleteType,
  deleteAllTypes,
  //
  getAllPokemonDB,
  addPokemon,
  deletePokemon,
  deleteAllPokemon,
  //
  getAllTrainersDB,
  addTrainer,
  deleteTrainer,
  deleteAllTrainers,
};
