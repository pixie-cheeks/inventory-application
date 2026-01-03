interface TableSchema {
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
    columns: ['pokemon_name', 'type_one', 'type_two'],
    values: [['pikachu', 'electric']],
  },
  trainers: {
    columns: ['trainer_name'],
    values: [['ash']],
  },
  owned_pokemons: {
    columns: ['pokemon', 'trainer'],
    values: [['pikachu', 'ash']],
  },
};

export { tableSeeds };
