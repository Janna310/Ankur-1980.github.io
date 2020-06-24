-- create extension "uuid-ossp";

-- CREATE TABLE favorites (
-- fav_id SERIAL PRIMARY KEY,
-- 	fav_info VARCHAR,
-- 	fav_cat VARCHAR,
-- 	user_id UUID
-- );

-- CREATE TABLE users (
-- user_id UUID PRIMARY KEY,
-- 	first_name VARCHAR,
-- 	last_name VARCHAR,
-- 	username VARCHAR,
-- 	email VARCHAR,
-- 	password VARCHAR,
-- 	bio VARCHAR,
-- 	age int,
-- 	picture VARCHAR
-- );

-- INSERT INTO users (user_id, first_name, last_name, username, email, password, bio, age, picture)
-- VALUES (uuid_generate_v4(), 'John', 'Doe', 'johnnyBoy', 'john@gmail.com', 'password', 'This is my bio. I do not have much to say', '28', null);

SELECT * FROM favorites;
