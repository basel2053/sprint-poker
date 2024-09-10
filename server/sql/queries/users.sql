-- name: CreateUser :one

INSERT INTO users
(id, email, password)
VALUES
($1, $2, $3)
RETURNING *;

-- name: GetUserByEmail :one

SELECT id, email,password FROM users
WHERE email = $1;

-- name: GetUserByID :one

SELECT id, email FROM users
WHERE id = $1;
