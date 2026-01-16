CREATE TABLE IF NOT EXISTS types (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    type_name VARCHAR(255) UNIQUE,
    image_src VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS pokemons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    pokemon_name VARCHAR(255) UNIQUE,
    pokemon_description VARCHAR(255),
    type_one VARCHAR(255) REFERENCES types (type_name),
    type_two VARCHAR(255) REFERENCES types (type_name) NULL,
    image_src VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS trainers (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    trainer_description VARCHAR(255),
    trainer_name VARCHAR(255) UNIQUE,
    image_src VARCHAR(255) NULL
);

CREATE TABLE IF NOT EXISTS owned_pokemons (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    pokemon VARCHAR(255) REFERENCES pokemons (pokemon_name),
    trainer VARCHAR(255) REFERENCES trainers (trainer_name)
);
