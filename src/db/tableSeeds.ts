export interface TableSchema {
  columns: string[];
  values: (string | number)[][];
}
type TableSeeds = Record<string, TableSchema | undefined>;

const tableSeeds: TableSeeds = {
  types: {
    columns: ['type_name'],
    values: [['electric'], ['fire'], ['water'], ['grass']],
  },
  pokemons: {
    columns: ['pokemon_name', 'type_one', 'pokemon_description'],
    values: [['pikachu', 'electric', 'An electric mouse pokemon.']],
  },
  trainers: {
    columns: ['trainer_name', 'trainer_description'],
    values: [['ash', 'Ash has a nice cap.']],
  },
  owned_pokemons: {
    columns: ['pokemon', 'trainer'],
    values: [['pikachu', 'ash']],
  },
};

export { tableSeeds };
