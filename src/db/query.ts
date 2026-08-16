import { pool } from './pool.js';

interface PokemonType {
  id: number;
  type_name: string;
}

interface Pokemon {
  id: number;
  pokemon_name: string;
  pokemon_description: string;
  type_one: string;
  type_two?: string;
}

interface Trainer {
  id: number;
  trainer_name: string;
  trainer_description: string;
}

const generateSetClause = (fieldsToUpdate: object): string => {
  const fields = Object.keys(fieldsToUpdate);

  // Generate the SET clause: "col1 = $1, col2 = $2, ..."
  return fields.map((field, index) => `${field} = $${index + 1}`).join(', ');
};

const getAllTypesDB = async (): Promise<PokemonType[]> => {
  const { rows } = await pool.query<PokemonType>('SELECT * FROM types;');
  return rows;
};

const getType = async (id: number): Promise<PokemonType | undefined> => {
  const {
    rows: [row],
  } = await pool.query<PokemonType>('SELECT * FROM types WHERE id = $1;', [id]);
  return row;
};

const addType = async ({
  type_name,
}: Omit<PokemonType, 'id'>): Promise<void> => {
  await pool.query('INSERT INTO types (type_name) VALUES ($1);', [type_name]);
};

const editType = async ({
  id,
  new_name,
}: {
  id: number;
  new_name: string;
}): Promise<void> => {
  await pool.query('UPDATE types SET type_name = $1 WHERE id = $2;', [
    new_name,
    id,
  ]);
};

const deleteType = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM types WHERE id = $1;', [id]);
};

const deleteAllTypes = async (): Promise<void> => {
  await pool.query('DELETE FROM types;');
};

const getAllPokemonDB = async (): Promise<Pokemon[]> => {
  const { rows } = await pool.query<Pokemon>('SELECT * FROM pokemons;');
  return rows;
};

const getPokemon = async (id: number): Promise<Pokemon | undefined> => {
  const {
    rows: [row],
  } = await pool.query<Pokemon>('SELECT * FROM pokemons WHERE id = $1;', [id]);
  return row;
};

const addPokemon = async ({
  pokemon_name,
  pokemon_description,
  type_one,
  type_two,
}: Omit<Pokemon, 'id'>): Promise<void> => {
  await pool.query(
    `INSERT INTO pokemons (pokemon_name, pokemon_description, type_one, type_two) VALUES ($1, $2, $3, $4);`,
    [pokemon_name, pokemon_description, type_one, type_two],
  );
};

const editPokemon = async (
  id: number,
  pokemonData: Partial<Omit<Pokemon, 'id'>>,
): Promise<void> => {
  const dataValues = Object.values(pokemonData);
  if (dataValues.length === 0) return;
  const setClause = generateSetClause(pokemonData);

  await pool.query(
    `UPDATE pokemons SET ${setClause} WHERE id = $${dataValues.length};`,
    [...dataValues, id],
  );
};

const deletePokemon = async (id: number): Promise<void> => {
  await pool.query('DELETE FROM pokemons WHERE id = $1;', [id]);
};

const deleteAllPokemon = async (): Promise<void> => {
  await pool.query('DELETE FROM pokemons;');
};

const getAllTrainersDB = async (): Promise<Trainer[]> => {
  const { rows } = await pool.query<Trainer>('SELECT * FROM trainers;');
  return rows;
};

const getTrainer = async (id: number): Promise<Trainer | undefined> => {
  const {
    rows: [row],
  } = await pool.query<Trainer>('SELECT * FROM trainers WHERE id = $1;', [id]);

  return row;
};

const addTrainer = async ({
  trainer_name,
  trainer_description,
}: Omit<Trainer, 'id'>): Promise<void> => {
  await pool.query(
    'INSERT INTO trainers (trainer_name, trainer_description) VALUES ($1, $2);',
    [trainer_name, trainer_description],
  );
};

const editTrainer = async ({
  id,
  newTrainerName,
}: {
  id: number;
  newTrainerName: string;
}): Promise<void> => {
  await pool.query('UPDATE trainers SET trainer_name = $1 WHERE id = $2;', [
    newTrainerName,
    id,
  ]);
};

const deleteTrainer = async (id: string): Promise<void> => {
  await pool.query('DELETE FROM Trainers WHERE id = $1;', [id]);
};

const deleteAllTrainers = async (): Promise<void> => {
  await pool.query('DELETE FROM Trainers;');
};

export {
  getAllTypesDB,
  getType,
  addType,
  editType,
  deleteType,
  deleteAllTypes,
  //
  getAllPokemonDB,
  getPokemon,
  addPokemon,
  editPokemon,
  deletePokemon,
  deleteAllPokemon,
  //
  getAllTrainersDB,
  getTrainer,
  addTrainer,
  editTrainer,
  deleteTrainer,
  deleteAllTrainers,
};
