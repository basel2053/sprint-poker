-- +goose Up

CREATE TABLE users (
  id UUID PRIMARY KEY,
  email TEXT NOT NULL,
  password TEXT NOT NULL,
  display_name TEXT NOT NULL,
  created_at TIMESTAMP NOT NULL DEFAULT now(),
  updated_at TIMESTAMP NOT NULL DEFAULT now()
);

-- +goose Down

DROP TABLE users;
