-- Getting user and case info
SELECT users.id AS currentUser_id, users.name AS user_name, email, company_name, image, cases.id AS case_id, cases.name AS case_name
FROM users INNER JOIN cases
ON (users.id = cases.users_id)
WHERE users.id = 1;



-- Getting case, group, preferences, and user info for Case Page
SELECT cases.id AS case_id, cases.name, age, contact, groups.id AS group_id, group_name, users.name AS user_name, users.id, likes, dislikes
FROM cases LEFT JOIN groups
ON (cases.id = groups.case_id)
LEFT JOIN users
ON (users.id = cases.users_id)
LEFT JOIN preferences
ON (cases.id = preferences.case_id)
WHERE cases.id = 1




-- Getting user and case info for Home Page
SELECT users.id AS currentUser_id, users.name AS user_name, email, company_name, image, cases.id AS case_id, cases.name AS case_name
FROM cases FULL OUTER JOIN users
ON (users.id = cases.users_id)
WHERE users.id = 1;


-- Update case info
UPDATE cases SET
name = 'Johnny',
age = 19,
contact = 12039102390
WHERE id = 3 AND users_id = 1


-- get all users who I've sent invites
SELECT sender, receiver, users.id AS user_id, name, email, company_name, password, image
FROM invites LEFT JOIN users
ON (receiver = users.id)
WHERE sender = ($1)



-- Delete users from invite table and push them to friends table (will add again to make both side even)
WITH pushing_to_friends AS (DELETE FROM invites WHERE sender = 1 AND receiver = 2 RETURNING *) INSERT INTO friends (first_user, second_user) VALUES (1, 2)


-- get all friends
SELECT users.id AS user_id, name, email, company_name, image, first_user, second_user
FROM users RIGHT JOIN friends
ON (friends.first_user = 1)
WHERE (users.id = friends.first_user OR users.id = friends.second_user) AND users.id != 1
ORDER BY users.id;



-- getting cases added
WITH adding_case AS (
	INSERT INTO cases (creator_id, name, age, contact)
	VALUES (1, 'john', 12, 1213123)
	RETURNING *
)
INSERT INTO user_cases (users_id, case_id)
SELECT creator_id, id FROM adding_case
RETURNING *



-- for home page: get case where it is in user_cases and cases
SELECT users_id, case_id, name, age, contact
FROM cases INNER JOIN user_cases
ON (cases.id = user_cases.case_id)
WHERE user_cases.users_id = 1 ORDER BY case_id



-- find case
SELECT *
FROM cases INNER JOIN user_cases
ON (cases.id = user_cases.case_id)
WHERE name LIKE ('C%') AND user_cases.users_id = 1

-- get comment edit page
SELECT comments.id, comments.case_id, user_cases.users_id AS user_id, user_name, content, created_at, name
FROM comments INNER JOIN cases
ON (comments.case_id = cases.id)
INNER JOIN user_cases
ON (comments.case_id = user_cases.case_id)
WHERE comments.id = ($1)



SELECT comments.id, comments.case_id, user_cases.users_id AS user_id, user_name, created_at, name
FROM comments INNER JOIN cases
ON (comments.case_id = cases.id)
INNER JOIN user_cases
ON (comments.case_id = user_cases.case_id)
WHERE comments.id = ($1)