CREATE TABLE tasks (
	id SERIAL PRIMARY KEY,
	todo varchar(100),
	complete BOOLEAN
);

INSERT INTO tasks (todo, complete) VALUES ('homework', false);
