CREATE TABLE IF NOT EXISTS users(
	id SERIAL PRIMARY KEY,
	name TEXT,
	email TEXT UNIQUE,
	company_name TEXT,
	password TEXT,
	image TEXT
);



CREATE TABLE IF NOT EXISTS user_cases(
	id SERIAL PRIMARY KEY,
	users_id INTEGER,
	case_id INTEGER
);



CREATE TABLE IF NOT EXISTS cases(
	id SERIAL PRIMARY KEY,
	users_id INTEGER,
	name VARCHAR(20),
	age INTEGER,
	contact INTEGER
);


CREATE TABLE IF NOT EXISTS preferences(
	id SERIAL PRIMARY KEY,
	case_id INTEGER,
	likes VARCHAR(40),
	dislikes VARCHAR(40)
);


CREATE TABLE IF NOT EXISTS comments(
	id SERIAL PRIMARY KEY,
	case_id INTEGER,
	content TEXT
);


CREATE TABLE IF NOT EXISTS groups(
	id SERIAL PRIMARY KEY,
	case_id INTEGER UNIQUE,
	group_name VARCHAR(20)
);



CREATE TABLE IF NOT EXISTS follows(
	id SERIAL PRIMARY KEY,
	users_id INTEGER,
	follow_id INTEGER
);