import { pokemonsTable, type Pokemon } from '../models/pokemonsModel.js';
import { trainersTable, type Trainer } from '../models/trainersModel.js';
import { typesTable, type PokemonType } from '../models/typesModel.js';
import {
  ownedPokemonTable,
  type OwnedPokemon,
} from '../models/ownedPokemonTableModel.js';

type InsertionPokemonType = Omit<PokemonType, 'id'>;
type InsertionPokemon = Omit<Pokemon, 'id'>;
type InsertionTrainer = Omit<Trainer, 'id'>;
type InsertionOwnedPokemon = Omit<OwnedPokemon, 'id'>;

const types: InsertionPokemonType[] = [
  { type_name: 'electric' },
  { type_name: 'fire' },
  { type_name: 'water' },
  { type_name: 'grass' },
];

const trainers: InsertionTrainer[] = [
  { trainer_name: 'Ash', trainer_description: 'Ash has a nice cap.' },
];

const pokemons: InsertionPokemon[] = [
  {
    pokemon_name: 'Pikachu',
    type_one: 'electric',
    pokemon_description: 'An electric mouse pokemon.',
  },
  {
    pokemon_name: 'Bulbasaur',
    type_one: 'grass',
    pokemon_description: 'A grass frog pokemon',
  },
];

// The IDs here are indexes from the previous arrays.
// This is done this way since IDs are dynamically generated
// after insertion.
const owned_pokemons: InsertionOwnedPokemon[] = [
  { pokemon_id: 0, trainer_id: 0 },
  { pokemon_id: 1, trainer_id: 0 },
];

const tableOrderArray = [
  ownedPokemonTable,
  pokemonsTable,
  trainersTable,
  typesTable,
];

const resetTables = (): Promise<undefined[]> =>
  Promise.all(tableOrderArray.map((table) => table.deleteAllRows()));

const dropTables = async (): Promise<undefined> => {
  for (const table of tableOrderArray) {
    // eslint-disable-next-line no-await-in-loop
    await table.dropTable();
  }
};

const getMappedOwnedPokemon = (
  insertedPokemons: (Pokemon | undefined)[],
  insertedTrainers: (Trainer | undefined)[],
): InsertionOwnedPokemon[] =>
  owned_pokemons.map(({ pokemon_id, trainer_id }) => {
    const insertedPokemonId = insertedPokemons.at(pokemon_id)?.id;
    const insertedTrainerId = insertedTrainers.at(trainer_id)?.id;

    if (!(insertedPokemonId && insertedTrainerId))
      throw new Error('Undefined IDs when inserting an owned pokemon.');

    return {
      pokemon_id: insertedPokemonId,
      trainer_id: insertedTrainerId,
    };
  });

const seedTables = async (): Promise<undefined> => {
  await Promise.all(types.map((type) => typesTable.insertRow(type)));

  const insertedTrainers = await Promise.all(
    trainers.map((trainer) => trainersTable.insertRow(trainer)),
  );

  const insertedPokemons = await Promise.all(
    pokemons.map((pokemon) => pokemonsTable.insertRow(pokemon)),
  );

  await Promise.all(
    getMappedOwnedPokemon(insertedPokemons, insertedTrainers).map(
      (ownedPokemon) => ownedPokemonTable.insertRow(ownedPokemon),
    ),
  );
};

export { resetTables, seedTables, dropTables };
