DROP TABLE IF EXISTS votes;
CREATE TABLE votes (
  user_id INTEGER REFERENCES users(id),
  post_id INTEGER REFERENCES posts(id),
  vote INTEGER NOT NULL CHECK (vote IN (-1, 1)),
  PRIMARY KEY (user_id, post_id)
);
