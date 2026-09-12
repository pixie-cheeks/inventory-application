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
  {
    type_name: 'Electric',
    image_src:
      'https://wallpapers.com/images/hd/electricity-pictures-t3rd8krvpro7yjlu.jpg',
  },
  {
    type_name: 'Fire',
    image_src:
      'https://img.magnific.com/premium-photo/fire-natural-phenomenon-hannover_1048944-10478964.jpg',
  },
  {
    type_name: 'Water',
    image_src:
      'https://thumbs.dreamstime.com/b/clear-water-glass-cup-generative-ai-high-quality-illustration-273613563.jpg',
  },
  {
    type_name: 'Grass',
    image_src:
      'https://thumbs.dreamstime.com/b/green-grass-cup-isolated-white-background-raw-food-concep-concept-40233681.jpg',
  },
];

const trainers: InsertionTrainer[] = [
  {
    trainer_name: 'Ash Ketchum',
    trainer_description: 'Ash has a nice cap.',
    image_src:
      'https://wallpapers.com/images/hd/ash-ketchum-pokemon-trainer-phzqjgbsyn6ei9sx.jpg',
  },
  {
    trainer_name: 'Misty',
    trainer_description: 'Misty likes to swim a lot.',
    image_src:
      'https://i.pinimg.com/originals/a4/6a/5a/a46a5afdf9eacb9c8b3334a8b4c176d1.png',
  },
];

const pokemons: InsertionPokemon[] = [
  {
    pokemon_name: 'Pikachu',
    type_one: 'Electric',
    pokemon_description: 'An electric mouse pokemon.',
    image_src:
      'https://vignette.wikia.nocookie.net/ssbb/images/b/b8/025Pikachu_LG.png/revision/latest?cb=20190520161120&path-prefix=es',
  },
  {
    pokemon_name: 'Bulbasaur',
    type_one: 'Grass',
    pokemon_description: 'A grass frog pokemon.',
    image_src:
      'https://www.pokemon.com/static-assets/content-assets/cms2/img/pokedex/full/001.png',
  },
  {
    pokemon_name: 'Psyduck',
    type_one: 'Water',
    pokemon_description: 'A water duck pokemon.',
    image_src:
      'https://www.pngmart.com/files/22/Psyduck-Pokemon-PNG-Photos.png',
  },
];

// The IDs here are indexes from the previous arrays.
// This is done this way since IDs are dynamically generated
// after insertion.
const owned_pokemons: InsertionOwnedPokemon[] = [
  { pokemon_id: 0, trainer_id: 0 },
  { pokemon_id: 1, trainer_id: 0 },
  { pokemon_id: 2, trainer_id: 1 },
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
