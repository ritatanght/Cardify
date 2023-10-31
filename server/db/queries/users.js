const db = require("../../configs/db.config");

const getUserUsername = (userId) => {
  const query = `
   SELECT id, username
   FROM users
   WHERE users.id = $1
   AND deleted = false;
  `;
  return db.query(query, [userId]).then((data) => data.rows[0]);
};

module.exports = {
  getUserUsername,
};
