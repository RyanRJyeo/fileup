-- Getting user and case info
SELECT users.id AS currentUser_id, users.name AS user_name, email, company_name, image, cases.id AS case_id, cases.name AS case_name
FROM users INNER JOIN cases
ON (users.id = cases.users_id)
WHERE users.id = 1;



-- Getting case, group and user info for Case Page
SELECT cases.id AS case_id, cases.name, age, contact, groups.id AS group_id, group_name, users.name AS user_name, users.id
FROM cases LEFT JOIN groups
ON (cases.id = groups.case_id)
LEFT JOIN users
ON (users.id = cases.users_id)
WHERE cases.id = 1


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




-- Update group name is already inserted before
UPDATE groups SET group_name = asdasd WHERE case_id = asdasd;