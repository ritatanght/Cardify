DROP TABLE IF EXISTS cards CASCADE;

CREATE TABLE cards (
  id SERIAL PRIMARY KEY,
  set_id INT REFERENCES sets(id),
  front VARCHAR(255) NOT NULL,
  back VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  deleted BOOLEAN DEFAULT false
);