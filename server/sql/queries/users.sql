-- name: CreateUser :one

INSERT INTO users
(id, email, password, display_name)
VALUES
($1, $2, $3, $4)
RETURNING *;

-- name: GetUserByEmail :one

SELECT * FROM users
WHERE email = $1;

-- name: GetUserByID :one

SELECT id, email FROM users
WHERE id = $1;
