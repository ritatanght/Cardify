const db = require("../../configs/db.config");
const { randomUUID } = require("crypto");

const getUserUsername = (userId) => {
  const query = `
   SELECT id, username
   FROM users
   WHERE users.id = $1
   AND deleted = false;
  `;
  return db.query(query, [userId]).then((data) => data.rows[0]);
};

const createUser = (email, username, hash) => {
  const query = `
  INSERT INTO users (id, username, email, hashed_password)
  VALUES 
  ($1, $2, $3, $4)
  RETURNING id, username, email
  `;
  return db
    .query(query, [randomUUID(), username, email, hash])
    .then((data) => data.rows[0]);
};

const getUserByEmail = (email) => {
  const query = `
   SELECT *
   FROM users
   WHERE email = $1
   AND deleted = false;
  `;
  return db.query(query, [email]).then((data) => data.rows[0]);
};

module.exports = {
  getUserUsername,
  createUser,
  getUserByEmail,
};
