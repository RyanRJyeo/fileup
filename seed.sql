-- Getting user and case info
SELECT users.id AS currentUser_id, users.name AS user_name, email, company_name, image, cases.id AS case_id, cases.name AS case_name
FROM users INNER JOIN cases
ON (users.id = cases.users_id)
WHERE users.id = 1;



-- Getting case and group info
SELECT cases.id AS case_id, name, age, contact, groups.id AS group_id, group_name
FROM cases LEFT JOIN groups
ON (cases.id = groups.case_id)
WHERE cases.id = 2;



UPDATE groups SET group_name = asdasd WHERE case_id = asdasd;