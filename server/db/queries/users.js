const db = require("../../configs/db.config")

const getUserUsername = (userId) => {
  const query = `
   SELECT users.username
   FROM users
   WHERE users.id = $1;
  `;
  return db.query(query, [userId])
    .then(data => data.rows[0])
};

module.exports = {
  getUserUsername
}