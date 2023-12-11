DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
  --id SERIAL PRIMARY KEY,
  id VARCHAR(255) PRIMARY KEY, -- amended to string to fit another project 
  username VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  hashed_password VARCHAR(255),
  deleted BOOLEAN DEFAULT false
);