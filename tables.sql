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
	case_id INTEGER,
	UNIQUE (users_id, case_id)
);



CREATE TABLE IF NOT EXISTS cases(
	id SERIAL PRIMARY KEY,
	creator_id INTEGER,
	name VARCHAR(20),
	age INTEGER,
	contact VARCHAR(20)
);


CREATE TABLE IF NOT EXISTS preferences(
	id SERIAL PRIMARY KEY,
	case_id INTEGER UNIQUE,
	likes TEXT,
	dislikes TEXT
);


CREATE TABLE IF NOT EXISTS comments(
	id SERIAL PRIMARY KEY,
	case_id INTEGER,
	user_name TEXT,
	content TEXT,
	created_at TIMESTAMPTZ DEFAULT now(),
	updated_at TEXT,
	updated_by TEXT
);


CREATE TABLE IF NOT EXISTS invites(
	id SERIAL PRIMARY KEY,
	sender INTEGER,
	receiver INTEGER
);


CREATE TABLE IF NOT EXISTS friends(
	id SERIAL PRIMARY KEY,
	first_user INTEGER,
	second_user INTEGER,
	UNIQUE (first_user, second_user)
);