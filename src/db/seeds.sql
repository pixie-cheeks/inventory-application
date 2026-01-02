INSERT INTO types (name) VALUES ('electric'), ('normal'), ('fire');
INSERT INTO trainer (name) VALUES ('ash'), ('misty'), ('brock');
INSERT INTO pokemon (name, type_one_id) VALUES (
    'pikachu', (
        SELECT id FROM types
        WHERE name = 'electric'
    )
);
INSERT INTO owned_pokemon (pokemon_id, trainer_id) VALUES (
    (
        SELECT id FROM pokemon
        WHERE name = 'pikachu'
    ),
    (
        SELECT id FROM trainer
        WHERE name = 'ash'
    )
);
