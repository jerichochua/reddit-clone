DROP TABLE IF EXISTS posts;
CREATE TABLE posts (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author_id INTEGER REFERENCES users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  post_type TEXT NOT NULL,
  category INTEGER REFERENCES categories(id),
  score INTEGER DEFAULT 0,
  content TEXT NOT NULL,
  post_url TEXT
);
