import { pokemonsTable, type Pokemon } from '../models/pokemonsModel.js';
import { trainersTable, type Trainer } from '../models/trainersModel.js';
import { typesTable, type PokemonType } from '../models/typesModel.js';

const types: Omit<PokemonType, 'id'>[] = [
  { type_name: 'electric' },
  { type_name: 'fire' },
  { type_name: 'water' },
  { type_name: 'grass' },
];

const trainers: Omit<Trainer, 'id'>[] = [
  { trainer_name: 'Ash', trainer_description: 'Ash has a nice cap.' },
];

const pokemons: Omit<Pokemon, 'id'>[] = [
  {
    pokemon_name: 'Pikachu',
    type_one: 'electric',
    pokemon_description: 'An electric mouse pokemon.',
  },
];

const tableOrderArray = [pokemonsTable, trainersTable, typesTable];

const resetTables = (): Promise<undefined[]> =>
  Promise.all(tableOrderArray.map((table) => table.deleteAllRows()));

const dropTables = async (): Promise<undefined> => {
  for (const table of tableOrderArray) {
    // eslint-disable-next-line no-await-in-loop
    await table.dropTable();
  }
};

const seedTables = async (): Promise<undefined> => {
  await Promise.all(types.map((type) => typesTable.insertRow(type)));

  await Promise.all(
    trainers.map((trainer) => trainersTable.insertRow(trainer)),
  );

  await Promise.all(
    pokemons.map((pokemon) => pokemonsTable.insertRow(pokemon)),
  );
};

export { resetTables, seedTables, dropTables };
