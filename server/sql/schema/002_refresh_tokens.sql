-- +goose Up

CREATE TABLE refresh_tokens(
  id UUID PRIMARY KEY,
  token TEXT NOT NULL UNIQUE,
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE
);

-- +goose Down

DROP TABLE refresh_tokens;
