CREATE TABLE tasks (
    id SERIAL PRIMARY KEY,
    todo varchar(100),
    complete BOOLEAN default false
);

INSERT INTO tasks (todo) VALUES ('Get mail');