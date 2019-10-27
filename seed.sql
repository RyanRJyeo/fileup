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


-- Getting group info from case info for Home Page
SELECT *
FROM cases INNER JOIN groups
ON (cases.id = groups.case_id)
WHERE users_id = 1;



-- Update case info
UPDATE cases SET
name = 'Johnny',
age = 19,
contact = 12039102390
WHERE id = 3 AND users_id = 1



-- get group page
SELECT groups.id AS group_id, groups.users_id, group_name, cases.id AS cases_id, name, age, contact
FROM groups LEFT JOIN cases
ON (groups.id = group_id)
WHERE groups.id = 1;


-- get all users who I've sent invites
WITH invites_sent AS (SELECT * FROM invites WHERE sender = ($1)) SELECT * FROM users WHERE



SELECT sender, receiver, users.id AS user_id, name, email, company_name, password, image
FROM invites LEFT JOIN users
ON (receiver = users.id)
WHERE sender = ($1)