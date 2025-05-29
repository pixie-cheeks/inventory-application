CREATE TABLE IF NOT EXISTS usernames (
    id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
    username VARCHAR(255)
);

INSERT INTO usernames (username)
VALUES
('Bryan'),
('Odin'),
('Damon');
