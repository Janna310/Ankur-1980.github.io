-- CREATE TABLE drink_posts (post_id UUID PRIMARY KEY,
-- 																											drink_name VARCHAR, rating DECIMAL(2,1),
-- 																											glassware VARCHAR, description VARCHAR, location VARCHAR, image_location VARCHAR, date_added TIMESTAMPTZ,
-- 																											user_id UUID, username VARCHAR);


-- INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username)
-- VALUES (uuid_generate_v4(),
-- 									'Lions Tail',
-- 									'4.5',
-- 									'Coupe',
-- 									'Spicy',
-- 									'Eastern Standard',
-- 									null,
-- 									'2020-06-21T12:14:11-04:00', '649471cb-ebbf-45e7-949a-7a7204e28bc8', 'tifa');


-- INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username)
-- VALUES (uuid_generate_v4(),
-- 									'Dark and Stormy',
-- 									'3.5',
-- 									'Tall Glass',
-- 									'sooo good',
-- 									'TGIF',
-- 									null,
-- 									'2020-05-22T12:14:11-04:00', '649471cb-ebbf-45e7-949a-7a7204e28bc8', 'tifa');


-- INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username)
-- VALUES (uuid_generate_v4(),
-- 									'Earthquake Island',
-- 									'4.5',
-- 									'Big Cube',
-- 									'smoky',
-- 									'Selden Standard',
-- 									null,
-- 									'2020-06-21T12:14:11-04:00', '649471cb-ebbf-45e7-949a-7a7204e28bc8', 'tifa');


-- INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username)
-- VALUES (uuid_generate_v4(),
-- 									'Moscow Mule',
-- 									'2.5',
-- 									'Tall Glass',
-- 									'Lame',
-- 									'Temple Bar',
-- 									null,
-- 									'2020-05-24T12:14:11-04:00', '6f804ac8-b109-46c9-b93c-7cb5e2feeea9', 'janeSmith');


-- INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username)
-- VALUES (uuid_generate_v4(),
-- 									'Sex on the Beach',
-- 									'3.5',
-- 									'Big Cube',
-- 									'fruity and sweety can not drink too many',
-- 									'Random bar',
-- 									null,
-- 									'2020-06-22T12:14:11-04:00', '6f804ac8-b109-46c9-b93c-7cb5e2feeea9', 'janeSmith');

-- INSERT INTO drink_posts (post_id, drink_name, rating, glassware, description, location, image_location, date_added, user_id, username)
-- VALUES (uuid_generate_v4(), 'something', '1.5', 'rocks', 'terrible', 'SheWolf', null, '2020-06-19 16:14:11+00', '649471cb-ebbf-45e7-949a-7a7204e28bc8', 'tifa');

-- DELETE FROM drink_posts WHERE post_id = 'd4157622-a6cc-4417-ad82-c3eef9a4beee';


SELECT *
FROM drink_posts;

